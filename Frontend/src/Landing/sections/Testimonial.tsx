const testimonials = [
	{
		name: 'Ava Smith',
		avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
		text: 'Streamio has completely changed how I watch shows. The quality is amazing and I love the recommendations!',
		role: 'Content Creator',
	},
	{
		name: 'Liam Johnson',
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
		text: 'The live streaming tools are so easy to use. My audience has grown so much since I joined!',
		role: 'Streamer',
	},
	{
		name: 'Sophia Lee',
		avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
		text: 'No ads, great content, and I can watch on all my devices. Streamio is the best platform out there.',
		role: 'Subscriber',
	},
];

const Testimonial = () => {
	return (
		<section className="w-full bg-gradient-to-b from-[#181A20] to-[#232526] py-24 px-4 border-t border-[#23272F] flex items-center justify-center">
			<div className="max-w-5xl w-full flex flex-col items-center">
				<h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight text-center">
					What Our Users Say
				</h2>
				<p className="text-lg text-[#C7C9D3] mb-14 text-center max-w-2xl">
					Real feedback from our amazing community of streamers and viewers.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
					{testimonials.map((t, idx) => (
						<div
							key={idx}
							className="flex flex-col items-center bg-gradient-to-br from-[#23272F] to-[#232526] rounded-3xl p-8 shadow-xl border border-[#23272F] hover:shadow-2xl hover:border-[#ff512f] transition-all duration-300 group relative hover:scale-105 hover:-translate-y-1"
						>
							<img
								src={t.avatar}
								alt={t.name}
								className="w-16 h-16 rounded-full border-2 border-[#ff512f] mb-4 object-cover shadow-md"
							/>
							<p className="text-[#C7C9D3] text-base text-center mb-4 italic">
								“{t.text}”
							</p>
							<div className="flex flex-col items-center">
								<span className="text-white font-bold text-lg">{t.name}</span>
								<span className="text-[#ff512f] text-sm font-medium">
									{t.role}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonial;