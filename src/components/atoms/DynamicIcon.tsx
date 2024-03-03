"use client";

import BinnarySearch from "@/utils/binarySearch";
import * as Icons from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
	iconName?: string;
}

export default function DynamicIcon({ iconName = "AlignCenter" }: Props) {
	const [dynamicIcon, setDynamicIcon] = useState<React.ReactNode>(<></>);

	useEffect(() => {
		const search = BinnarySearch.Object(iconName, Object.entries(Icons).sort());

		const icon = search.result ? (
			React.createElement(search.result)
		) : (
			<Icons.AlignCenter />
		);

		setDynamicIcon(icon);
	}, [iconName]);

	return dynamicIcon;
}
