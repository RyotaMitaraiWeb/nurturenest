import { Heading } from "@/components/Heading";
import Link from "next/link";

export default function About() {
  return <>
    <Heading level={1}>За NurtureNest</Heading>
    <Link href="/">Back to home</Link>
  </>
}