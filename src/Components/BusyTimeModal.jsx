import React, { useState } from "react";
import { auth, datastore } from "../config/firbase";
import { update } from "firebase/database";
import { doc, updateDoc } from "firebase/firestore";

const BusyTimeModal = ({ isOpen, onClose, onSave }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ start, end });
    onClose();
  };

  if (!isOpen) return null;

  const handleAddTimeBusy = async () => {
    const user = auth.currentUser;

    const formattedStart = convertTo24HourFormat(start);
    const formattedEnd = convertTo24HourFormat(end);

    await updateDoc(doc(datastore, "users", user.uid), {
      busyTime: [
        {
          start: formattedStart,
          end: formattedEnd,
        },
      ],
    });
  };

  const convertTo24HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-sm:mt-5 p-6 rounded shadow-md max-sm:w-[80vw]">
        <h2 className="text-lg mb-4">
          {" "}
          أضف الساعات التي تريد استثناها من وضع المهام خلالها
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2"> من:</label>
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2"> إلى:</label>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={() => {
                handleAddTimeBusy();
              }}
              className="bg-[#FFA842] text-white rounded px-4 py-2"
            >
              حفظ
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#9685CF] ml-3 text-white rounded px-4 py-2 mr-2"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusyTimeModal;


// import React, { useState } from "react";

// const BusyTimeModal = ({ isOpen, onClose, onSave }) => {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSave({ start, end });
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-lg mb-4">
//           {" "}
//           أضف الساعات التي تريد استثناها من وضع المهام فيها
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2"> من:</label>
//             <input
//               type="time"
//               value={start}
//               onChange={(e) => setStart(e.target.value)}
//               className="border rounded p-2 w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2"> إلى:</label>
//             <input
//               type="time"
//               value={end}
//               onChange={(e) => setEnd(e.target.value)}
//               className="border rounded p-2 w-full"
//             />
//           </div>
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-[#FFA842] text-white rounded px-4 py-2"
//             >
//               حفظ
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-[#9685CF] ml-3 text-white rounded px-4 py-2 mr-2"
//             >
//               إلغاء
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BusyTimeModal;