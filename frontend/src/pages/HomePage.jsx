import React from "react";
import { Link } from "react-router";
import {
  ZapIcon,
  CheckIcon,
  ArrowRightIcon,
  VideoIcon,
  Code2Icon,
  UsersIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import Logo from "../components/Logo";
import BadgeCard from "../components/BadgeCard";
import Loader from "../components/Loader";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Navbar */}
      <nav className="bg-base-100/20 backdrop-blur-md border-b border-primary/5 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* Logo */}

          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl flex items-center justify-center shadow-lg">
              <Logo />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-lg text-white  tracking-normal">
                Code.Prepare
              </span>
              <span className="text-[6px] text-base-content/60 font-medium -mt-1">
                Code Together
              </span>
            </div>
          </Link>
          {/* Auth Btn */}

          <SignInButton mode="modal">
            <button
              title="Go to about me page"
              className="text-light-blue-light hover:text-white dark:text-gray-400 border-2 inline-flex items-center mr-4 last-of-type:mr-0 p-2.5 border-transparent bg-light-secondary shadow-button-flat-nopressed hover:border-2 hover:shadow-button-flat-pressed focus:opacity-100 focus:outline-none active:border-2 active:shadow-button-flat-pressed font-medium rounded-full text-sm text-center dark:bg-button-curved-default-dark dark:shadow-button-curved-default-dark dark:hover:bg-button-curved-pressed-dark dark:hover:shadow-button-curved-pressed-dark dark:active:bg-button-curved-pressed-dark dark:active:shadow-button-curved-pressed-dark dark:focus:bg-button-curved-pressed-dark dark:focus:shadow-button-curved-pressed-dark dark:border-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;&nbsp; Sign In
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8 flex flex-col">
            <BadgeCard msg={"Real-time Collaboration"} />

            <h1 className="text-5xl lg:text-5xl font-black leading-tight mx-auto">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Code Together,
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>

            <p className="antialiased text-md text-base-content/70 leading-relaxed max-w-xl font-sans text-center">
              The ultimate platform for collaborative coding interviews and pair
              programming. Connect face-to-face, code in real-time, and ace your
              technical interviews.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-md badge-outline">
                <CheckIcon className="size-3 text-success" />
                Live Video Chat
              </div>
              <div className="badge badge-md badge-outline">
                <CheckIcon className="size-3 text-success" />
                Code Editor
              </div>
              <div className="badge badge-md badge-outline">
                <CheckIcon className="size-3 text-success" />
                Multi-Language
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                aria-label="watch demo"
                className="px-8 py-2 font-sans text-white rounded-full shadow-lg transition-transform transform bg-transparent border-1 border-zinc-400 hover:scale-102 hover:border-green-600 hover:shadow-green-500/50 hover:shadow-2xl focus:outline-none flex flex-row"
                id="startButton"
              >
                <VideoIcon className="size-6 text-emerald-400 my-auto" />
                &nbsp;&nbsp; Watch Demo
              </button>

              <SignInButton mode="modal">
                {/* Get Started button  */}
                <button className="cursor-pointer group relative bg-white hover:bg-zinc-300 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12">
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="relative inline-block overflow-hidden">
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        Get Started
                      </span>
                      <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                        Code Now
                      </span>
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                      viewBox="0 0 24 24"
                    >
                      <circle fill="currentColor" r={11} cy={12} cx={12} />
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth={2}
                        stroke="white"
                        d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                      />
                    </svg>
                  </div>
                </button>
              </SignInButton>
            </div>

            {/* STATS */}
            <div className="stats lg:stats-horizontal bg-base-100 shadow-lg">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src="/hero.png"
            alt="CodeCollab Platform"
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless
            and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        {/* Feature 1 */}
        <div className="grid md:grid-cols-3 ">
          <Loader
            title={"HD Video Call"}
            description={
              "Crystal clear video and audio for seamless communication during interviews"
            }
          >
            <VideoIcon className="size-8 text-primary" />
          </Loader>

          {/* Feature 2  */}

          <Loader
            title={"Live Code Editor"}
            description={
              "Collaborate in real-time with syntax highlighting and multiple language support"
            }
          >
            <Code2Icon className="size-8 text-primary" />
          </Loader>

          {/* Feature 3  */}

          <Loader
            title={"Easy Collaboration"}
            description={
              "Share your screen, discuss solutions, and learn from each other in real-time"
            }
          >
            <UsersIcon className="size-8 text-primary" />
          </Loader>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
