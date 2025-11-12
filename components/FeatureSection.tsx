import React from "react";
import { Container } from "./Container";

export const FeatureSection = () => {
  return (
    <section className="FeatureSection relative z-10 bg-white">
      <Container>
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-xl font-medium text-gray-800">
              Feature heading
            </h1>
            <h2 className="text-4xl font-semibold text-gray-800">Title</h2>
            <p className="font-normal text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              voluptate qui voluptatibus nemo, distinctio a error, nesciunt at,
              magni quaerat animi aspernatur eligendi earum tenetur expedita vel
              quos autem! Ut?
            </p>
          </div>
          <div className="flex-1 justify-center md:justify-end bg-black rounded-lg py-6 drop-shadow-[10px_10px_0_#52ea71]">
            <video
              src="/assets/input-output.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </section>
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 justify-center md:justify-end bg-black rounded-lg py-6 drop-shadow-[-10px_10px_0_#52ea71]">
            <video
              src="/assets/input-output.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-xl font-medium text-gray-800">
              Feature heading
            </h1>
            <h2 className="text-4xl font-semibold text-gray-800">Title</h2>
            <p className="font-normal text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              voluptate qui voluptatibus nemo, distinctio a error, nesciunt at,
              magni quaerat animi aspernatur eligendi earum tenetur expedita vel
              quos autem! Ut?
            </p>
          </div>
        </section>
      </Container>
    </section>
  );
};
