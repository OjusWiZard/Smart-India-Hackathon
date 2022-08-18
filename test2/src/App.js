import { useState } from "react";
import { Switch, Popover } from "@headlessui/react";

function App() {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className="App">
			<h1 className="text-xs font-bold">Hello world!</h1>
			<button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
				Save changes
			</button>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={`${
					enabled ? "bg-blue-600" : "bg-gray-200"
				} relative inline-flex h-6 w-11 items-center rounded-full`}
			>
				<span className="sr-only">Enable notifications</span>
				<span
					className={`${
						enabled ? "translate-x-6" : "translate-x-1"
					} inline-block h-4 w-4 transform rounded-full bg-white`}
				/>
			</Switch>
			<Popover className="relative">
				<Popover.Button>Solutions</Popover.Button>

				<Popover.Panel className="absolute z-10">
					<div className="grid grid-cols-2">
						<a href="/analytics">Analytics</a>
						<a href="/engagement">Engagement</a>
						<a href="/security">Security</a>
						<a href="/integrations">Integrations</a>
					</div>

					<img src="/solutions.jpg" alt="" />
				</Popover.Panel>
			</Popover>
		</div>
	);
}

export default App;
