// lib/config/iconMapping.tsx

import {
	FaInfoCircle,
	FaHandshake,
	FaTasks,
	FaGift,
	FaUsers,
	FaUserFriends,
	FaCogs,
	FaShippingFast,
	FaMoneyBillWave,
	FaChartLine,
	FaChartBar,
	FaExclamationCircle,
	FaLightbulb,
	FaBox,
	FaMapMarkerAlt,
	FaClipboardCheck,
	FaBullhorn,
	FaProjectDiagram,
	FaLeaf,
	FaGavel,
} from "react-icons/fa";
import { ReactElement } from "react";

export const iconMapping: Record<string, ReactElement> = {
	info: <FaInfoCircle />,
	handshake: <FaHandshake />,
	tasks: <FaTasks />,
	gift: <FaGift />,
	users: <FaUsers />,
	userFriends: <FaUserFriends />,
	cogs: <FaCogs />,
	shippingFast: <FaShippingFast />,
	moneyBill: <FaMoneyBillWave />,
	chartLine: <FaChartLine />,
	chartBar: <FaChartBar />,
	exclamation: <FaExclamationCircle />,
	lightbulb: <FaLightbulb />,
	box: <FaBox />,
	mapMarker: <FaMapMarkerAlt />,
	clipboardCheck: <FaClipboardCheck />,
	bullhorn: <FaBullhorn />,
	projectDiagram: <FaProjectDiagram />,
	leaf: <FaLeaf />,
	gavel: <FaGavel />,
	// ... autres mappings si nécessaire
};
