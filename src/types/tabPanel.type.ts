type TabItem = {
	label: string;
	value: string;
}

export interface TabPanelProps {
	tabs: TabItem[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
}