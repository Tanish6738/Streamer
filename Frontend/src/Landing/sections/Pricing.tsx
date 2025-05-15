const plans = [
	{
		name: 'Basic',
		price: 'Free',
		features: [
			'Access to limited content',
			'Standard definition streaming',
			'Ad-supported',
			'Watch on 1 device',
		],
		highlight: false,
	},
	{
		name: 'Premium',
		price: '$9.99',
		features: [
			'Unlimited content',
			'HD & 4K streaming',
			'No ads',
			'Watch on 3 devices',
			'Offline downloads',
		],
		highlight: true,
	},
	{
		name: 'Family',
		price: '$14.99',
		features: [
			'Unlimited content',
			'HD & 4K streaming',
			'No ads',
			'Watch on 6 devices',
			'Offline downloads',
			'Parental controls',
		],
		highlight: false,
	},
];

const Pricing = () => {
	return (
		<section className="w-full bg-gradient-to-b from-[#232526] to-[#181A20] py-24 px-4 border-t border-[#23272F] flex items-center justify-center">
			<div className="max-w-6xl w-full flex flex-col items-center">
				<h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight text-center">
					Choose Your Plan
				</h2>
				<p className="text-lg text-[#C7C9D3] mb-14 text-center max-w-2xl">
					Flexible pricing for every streamer. Upgrade anytime for more features
					and the best experience.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
					{plans.map((plan, idx) => (
						<div
							key={idx}
							className={`flex flex-col items-center bg-gradient-to-br from-[#23272F] to-[#232526] rounded-3xl p-8 shadow-xl border border-[#23272F] transition-all duration-300 relative overflow-hidden ${
								plan.highlight
									? 'ring-2 ring-[#ff512f] scale-105 z-10'
									: 'hover:ring-2 hover:ring-[#ff512f] hover:scale-105'
							} group`}
						>
							<h3
								className={`text-xl font-bold mb-2 text-center ${
									plan.highlight ? 'text-[#ff512f]' : 'text-white'
								} transition-colors duration-300`}
							>
								{plan.name}
							</h3>
							<div className="text-3xl font-extrabold mb-4 text-white flex items-end gap-1">
								{plan.price}
								{plan.name !== 'Basic' && (
									<span className="text-base font-medium text-[#C7C9D3] mb-1">
										/mo
									</span>
								)}
							</div>
							<ul className="flex flex-col gap-2 mb-8 w-full">
								{plan.features.map((feature, i) => (
									<li
										key={i}
										className="flex items-center gap-2 text-[#C7C9D3] text-base"
									>
										<span className="w-2.5 h-2.5 rounded-full bg-[#ff512f] inline-block"></span>
										{feature}
									</li>
								))}
							</ul>
							<button
								className={`w-full py-2.5 rounded-full font-semibold mt-auto transition-colors duration-200 ${
									plan.highlight
										? 'bg-[#ff512f] text-white hover:bg-[#dd2476]'
										: 'bg-[#23272F] text-[#ff512f] border border-[#ff512f] hover:bg-[#ff512f] hover:text-white'
								}`}
							>
								{plan.name === 'Basic'
									? 'Get Started'
									: 'Choose Plan'}
							</button>
							{plan.highlight && (
								<div className="absolute top-4 right-4 bg-[#ff512f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
									Most Popular
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Pricing;