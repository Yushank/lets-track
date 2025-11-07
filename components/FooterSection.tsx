import React from "react";
import { Container } from "./Container";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const FooterSection = () => {
  const navLinks = [
    { title: "Link", href: "" },
    { title: "Link", href: "" },
    { title: "Link", href: "" },
  ];

  return (
    <Container>
      <section className="flex w-full mx-auto max-w-4xl flex-col items-start justify-center py-16">
        <hr className="mb-8 w-full border-1 border-gray-200 dark:border-gray-800" />
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="items-center">
            <div className="rounded-lg p-8">
              <p className="font-medium text-gray-700">Made by</p>
              <h1 className="text-3xl font-semibold text-gray-900">Yushank</h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            {navLinks.map((item, idx) => (
              <Link
                href={item.href}
                key={idx}
                className="font-normal text-gray-900 hover:text-gray-700"
              >
                <span className="flex gap-2">
                  {item.title}
                  <ArrowUpRight className="text-gray-900 hover:text-gray-700 max-w-5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};
