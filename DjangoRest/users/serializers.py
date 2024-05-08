from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(label="Email", write_only=True)
    password = serializers.CharField(
        label="Password",
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, data):
        email = data.get("email", "")
        password = data.get("password", "")

        if email and password:
            user_model = get_user_model()
            try:
                user = user_model.objects.get(email=email)
            except user_model.DoesNotExist:
                msg = "User with given email does not exist."
                raise serializers.ValidationError(msg)

            if user.check_password(password):
                if not user.is_active:
                    msg = "User account is disabled."
                    raise serializers.ValidationError(msg)
            else:
                msg = "Unable to log in with provided credentials."
                raise serializers.ValidationError(msg)
        else:
            msg = "Must include 'email' and 'password'."
            raise serializers.ValidationError(msg)
        data['user'] = user
        return data