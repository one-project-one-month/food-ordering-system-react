type TabItem = {
	label: string;
	value: string;
}

interface TabPanelProps {
	tabs: TabItem[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export default function TabPanel({ tabs, value, onChange, className }: TabPanelProps) {

	return (
		<div className={`flex gap-2 sm:gap-5 ${className}`}>
			{tabs.map((tab) => (
				<span
					className={`cursor-pointer text-sm font-medium text-black relative transition-colors after:contents-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
						value === tab.value ? "after:w-full" : "after:w-0 hover:after:w-full"
					}`}
					key={tab.value}
					onClick={() => onChange(tab.value)}
				>
					{tab.label}
				</span>
			))}
		</div>
	)
}