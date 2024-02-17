"use client";

import BinnarySearch from "@/utils/binarySearch";
import * as Icons from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
	iconName?: string;
}

export default function DynamicIcon({ iconName = "LucideAArrowDown" }: Props) {
	const [dynamicIcon, setDynamicIcon] = useState<React.ReactNode>(<></>);

	useEffect(() => {
		let search = BinnarySearch.Object(iconName, Object.entries(Icons).sort());
		if (!search.result) {
			search = BinnarySearch.Object("AlignCenter", Object.entries(Icons));
		}

		const icon = React.createElement(search.result);
		setDynamicIcon(icon);
	}, [iconName]);

	return dynamicIcon;
}
