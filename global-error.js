"use client";
import Button from "@/components/common/Button";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
	useEffect(() => {
		console.log("Global Error:" + error);
	}, [error]);
	function pressed() {
		window.location.replace("/");
		reset();
	}
	return (
		<html>
			<body>
				<div className="h-screen flex flex-col items-center justify-center">
					<span className="text-4xl font-bold mt-2">Oops</span>
					<span className="text-md mt-3">We&apos;re sorry,</span>
					<p className="text-md mb-5">Something went wrong!</p>
					<Button
						className="px-14 text-xl rounded-full border border-black bg-white text-black mt-5 py-2"
						handler={pressed}
					>
						Back To Home
					</Button>
				</div>
			</body>
		</html>
	);
}
