function StatusDropdown({ value, onChange, isLoading }) {
	return (
		<select
			value={value}
			onChange={onChange}
			className="select select-bordered w-full max-w-xs"
			disabled={isLoading}
		>
			<option
				disabled
				value=""
			>
				-- status --
			</option>
			<option value="pending">Pending</option>
			<option value="success">Success</option>
			<option value="declined">Declined</option>
		</select>
	);
}

export default StatusDropdown;
