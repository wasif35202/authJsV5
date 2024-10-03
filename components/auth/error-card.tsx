import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorCard() {
    return (
        <CardWrapper
            headerLabel="Oops! something went wrong"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
        >
            <div className="w-full items-center justify-center flex"><ExclamationTriangleIcon className="text-destructive" />  </div>

        </CardWrapper>



    )
} 