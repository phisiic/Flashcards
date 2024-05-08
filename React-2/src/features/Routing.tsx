import { RouteObject, useRoutes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FlashcardList } from "./flashcardtranslator/FlashcardList";
import { FlashcardForm } from "./flashcardtranslator/FlashcardForm";
import { ErrorPage } from "./error/ErrorPage";
import { Login } from "./users/Login";
import Register from "./users/Register";
import { Logout } from "./users/Logout";
import { FlashcardEditForm } from "./flashcardtranslator/FlashcardEditForm";
import { FlashcardPublic } from "./flashcardtranslator/FlashcardPublic";
import { FlashcardSaved } from "./flashcardtranslator/FlashcardSaved";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/flashcard',
                element: <FlashcardList/>
            },
            {
                path: '/flashcard/new',
                element: <FlashcardForm/>
            },
            {
                path: '/flashcard/:id',
                element: <FlashcardForm/>
            },
            {
                path: '/flashcard/:id/edit',
                element: <FlashcardEditForm/>
            },
            {
                path: '/flashcard/public',
                element: <FlashcardPublic/>
            },
            {
                path: '/flashcard/saved',
                element: <FlashcardSaved/>
            },
            {
                path: '*',
                element: <ErrorPage/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/logout',
                element: <Logout/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
]

export const Routing = () => {
    return useRoutes(routes);
}