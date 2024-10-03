"use client"

import Link from "next/link"
import { Button } from "../ui/button"

interface BackButtonProps {
    href: string
    label: string
}


export default function BackButton({ href, label, }: BackButtonProps) {
    return (
        <Button size='sm' className='font-normal w-full' variant='link' asChild><Link href={href}>{label}</Link></Button>
    )
}
 