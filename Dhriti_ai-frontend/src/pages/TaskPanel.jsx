



import React from "react";

const texts = [
  {
    title: "Reference Text",
    content:
      "The sun was setting behind the hills, painting the sky with shades of orange and pink. The gentle breeze carried the scent of blooming flowers.",
  },
  {
    title: "Original Text",
    content:
      "As the sun dipped below the mountains, the horizon glowed warmly, and the soft wind whispered through the fields.",
  },
  {
    title: "Response 1",
    content:
      "The evening sun faded slowly behind the hills, coloring the clouds with orange hues while the air filled with floral fragrance.",
  },
  {
    title: "Response 2",
    content:
      "The sun set beyond the hills turning the sky red, and the mild wind touched the earth like a soft melody.",
  },
];

const responses = ["Response 1", "Response 2"];
const ratingCategories = ["Faithfulness", "Expressiveness", "Consistency", "Overall"];
const ratings = ["Excellent", "Good", "Fair", "Poor"];

const TaskPanel = () => {
  return (
    <div className="w-full h-screen bg-gray-50 text-gray-800 flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wide">
          Text Evaluation Panel
        </div>

        <section className="bg-white shadow-md rounded-2xl p-6 flex relative">
          {/* Left: Text Samples (30%) */}
          <div className="w-[30%] flex flex-col gap-4 pr-4">
            {texts.map((text, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 hover:shadow-sm transition-shadow duration-200"
              >
                <span className="text-sm font-semibold text-blue-700">{text.title}</span>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">{text.content}</p>
              </div>
            ))}
          </div>

          {/* Divider Line */}
          <div className="w-[1px] bg-gray-200 mx-4"></div>

          {/* Right: Ratings (Remaining Space) */}
          <div className="flex-1 flex flex-col gap-6">
            {ratingCategories.map((category, cidx) => (
              <div key={cidx} className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-gray-700 border-b pb-1">
                  Rate the {category}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {responses.map((resp, ridx) => (
                    <div
                      key={ridx}
                      className="flex flex-col gap-1 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-blue-200"
                    >
                      <span className="text-xs font-medium text-gray-600 mb-1">{resp}</span>
                      <div className="flex gap-3 flex-wrap">
                        {ratings.map((rate, i) => (
                          <label
                            key={i}
                            className={`px-4 py-2 rounded-[10px] border text-sm font-medium cursor-pointer transition-all ${
                              rate === "Excellent"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`${category}_${ridx}`}
                              className="hidden"
                              defaultChecked={rate === "Excellent"}
                            />
                            {rate}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Feedback Section */}
            <div className="flex flex-col gap-2 mt-4">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-1">Feedback</h4>
              <textarea
                placeholder="Write your feedback here..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none h-24"
              ></textarea>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom buttons */}
      <div className="mt-4 flex justify-end gap-3">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          Submit Task
        </button>
        <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition">
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskPanel;
