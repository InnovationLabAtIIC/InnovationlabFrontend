import { motion } from 'framer-motion'

const CATEGORY_COLORS: Record<string, string> = {
    "Program": "bg-rose-600",
    "Competition": "bg-cyan-600",
    "Event": "bg-emerald-600",
    "Tech": "bg-indigo-600",
    "Volunteer": "bg-orange-500",
    "Workshop": "bg-yellow-400",
};

export default function Updates() {
    // Example blog data
    const BLOGS = [
        {
            id: 1,
            title: "Introducing Our New Summer Program",
            excerpt: "Discover the highlights of our upcoming summer enrichment program and how you can participate.",
            date: "3 hours ago",
            author: "Jane Doe",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            category: "Program",
        },
        {
            id: 2,
            title: "IIC Quest: Registration Now Open",
            excerpt: "Join the IIC Quest and compete with the brightest minds. Registration details inside.",
            date: "2 days ago",
            author: "John Smith",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            category: "Competition",
        },
        {
            id: 3,
            title: "Creative Clash: Winners Announced",
            excerpt: "Meet the winners of our Creative Clash event and see their amazing projects.",
            date: "3 weeks ago",
            author: "4 hours ago",
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
            category: "Event",
        },
        {
            id: 4,
            title: "Tech Talk: AI in Education",
            excerpt: "Explore how artificial intelligence is transforming the educational landscape.",
            date: "1 week ago",
            author: "Emily Carter",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
            category: "Tech",
        },
        {
            id: 5,
            title: "Volunteer Spotlight: Making a Difference",
            excerpt: "Read about our dedicated volunteers and their impact on our community.",
            date: "5 days ago",
            author: "Michael Lee",
            image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
            category: "Volunteer",
        },
        {
            id: 6,
            title: "Upcoming Workshop: Design Thinking",
            excerpt: "Sign up for our hands-on workshop and learn the fundamentals of design thinking.",
            date: "2 hours ago",
            author: "Sara Kim",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            category: "Workshop",
        },
    ];

    return (
        <div className="w-screen min-h-screen flex justify-center my-0 bg-black pb-12">
            <div className="max-w-[1240px] w-full my-0 h-auto mt-0 flex flex-col md:px-0 px-4">
                <h2 className="font-bold text-[8vw] md:text-[5vw] text-white text-left my-6 md:my-12">UPDATES</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BLOGS.map((blog) => (
                        <motion.div
                            key={blog.id}
                            className="relative overflow-hidden flex flex-col w-full h-auto pb-0 md:pb-12 cursor-pointer"
                            whileHover={{
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300, damping: 20 },
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className='w-full h-64'>
                                <div className={`${CATEGORY_COLORS[blog.category] || "bg-gray-400"} h-54 absolute top-10 left-0 w-10/12 z-0`} />
                                <motion.img
                                    src={blog.image}
                                    alt={""}
                                    className="w-full h-64 bg-white object-cover translate-x-4 -translate-y-4 relative z-10"
                                    whileHover={{
                                        scale: 1.04,
                                        transition: { type: "spring", stiffness: 200, damping: 18 },
                                    }}
                                />
                            </div>
                            <div className="p-0 flex flex-col flex-1 mt-4 relative z-10">
                                <h3 className="text-xl md:text-3xl font-bold mb-2 text-white">{blog.title}</h3>
                                <span className="text-md md:text-xl text-white mb-2">{blog.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}