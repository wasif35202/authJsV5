"use client";

import { useSearchParams } from "next/navigation";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";


export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams()
    const token = searchParams.get("token");


    console.log("Extracted token from URL: ", token);

    const onSubmit = useCallback(() => {
        if (success || error) return
        if (!token) {
            console.log(token); // Log when the token is missing
            setError("missing token")
            return
        }
        newVerification(token).then((data) => {
            console.log("Response from server: ", data); // Log server response
            setSuccess(data.success)
            setError(data.error)
        }).catch(() => {
            setError("something went wrong")

        })
    }, [token, success, error])
    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirming Your Verification"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
        >
            <div className="w-full items-center justify-center flex">
                {!success && !error && (<BeatLoader />)}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />

                )}
            </div>
        </CardWrapper>
    );
};
