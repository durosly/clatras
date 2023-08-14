function DateInput({ value, onChange, isLoading }) {
	return (
		<div className="flex flex-wrap">
			<div className="form-control">
				<input
					type="date"
					className="input input-bordered"
					value={value}
					onChange={onChange}
				/>
			</div>
			<button
				disabled={isLoading}
				className="btn btn-primary"
			>
				Search
			</button>
		</div>
	);
}

export default DateInput;
