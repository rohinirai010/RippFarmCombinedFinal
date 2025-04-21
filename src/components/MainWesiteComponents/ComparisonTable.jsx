import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const data = [
  { feature: "XRPL Validator", ripp: true, others: false },
  { feature: "Daily XRP Rewards", ripp: true, others: false },
  { feature: "15-Min Smart Deposit System", ripp: true, others: false },
  { feature: "Transparent Team & Roadmap", ripp: true, others: false },
  { feature: "Built for Mass Adoption", ripp: true, others: false },
];

const ComparisonTable = () => {
  return (
    <div className="p-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 rounded-xl max-w-[900px] custom-margin mx-auto my-10" data-aos="slide-up" data-aos-delay="300" data-aos-duration="700" data-aos-easing="ease-in-out">

      <div className="bg-[#122242] rounded-xl p-5 shadow-[rgb(211_190_190_/_35%)_0px_5px_15px]">
        <h3 className="text-white text-[2.441rem] font-semibold mb-6 ">
          Ripp Farm vs. The Rest – At a Glance
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-white">
            <thead>
              <tr className="bg-[#132447] text-left">
                <th className="p-4 border-b border-gray-700">Feature</th>
                <th className="p-4 border-b border-gray-700">Ripp Farm ✅</th>
                <th className="p-4 border-b border-gray-700">Others ❌</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="bg-[#11203d] hover:bg-[#1a2d4d] transition"
                >
                  <td className="border-b border-gray-700 text-sm md:text-base p-[10px] md:p-4">{row.feature}</td>
                  <td className="border-b border-gray-700 text-sm md:text-base p-[10px] md:p-4">
                    {row.ripp ? (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xl" />
                    )}
                  </td>
                  <td className="border-b border-gray-700 text-sm md:text-base p-[10px] md:p-4">
                    {row.others ? (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xl" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
