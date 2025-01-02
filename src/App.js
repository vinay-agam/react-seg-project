import React, { useState } from 'react';

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [dropdowns, setDropdowns] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const handleAddSchema = () => {
    if (selectedOption) {
      setDropdowns((prev) => [...prev, selectedOption]);
      setSelectedOption('');
    }
  };

  const handleSaveSegment = async () => {
    const schema = dropdowns.map((value) => {
      const option = schemaOptions.find((opt) => opt.value === value);
      return { [value]: option.label };
    });

    const data = {
      segment_name: segmentName,
      schema,
    };

    const webhookURL = 'https://webhook.site/1feb2778-a7ed-43ea-8420-6e2f5728e348';
    await fetch(webhookURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    alert('Segment saved successfully!');
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={() => setIsPopupOpen(true)}
      >
        Save segment
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end">
          <div className="bg-white p-6 rounded shadow-lg w-96 h-screen">
            <h2 className="text-xl font-bold mb-4">Save Segment</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Segment Name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Add schema to segment</option>
              {schemaOptions
                .filter((opt) => !dropdowns.includes(opt.value))
                .map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
            </select>
            <button
              className="text-blue-500 underline mb-4"
              onClick={handleAddSchema}
            >
              +Add new schema
            </button>
            <div className="bg-blue-100 p-4 rounded mb-4">
              {dropdowns.map((value, idx) => (
                <select
                  key={idx}
                  className="w-full p-2 border rounded mb-2"
                  value={value}
                  onChange={(e) => {
                    const newDropdowns = [...dropdowns];
                    newDropdowns[idx] = e.target.value;
                    setDropdowns(newDropdowns);
                  }}
                >
                  {schemaOptions
                    .filter(
                      (opt) =>
                        !dropdowns.includes(opt.value) || opt.value === value
                    )
                    .map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                </select>
              ))}
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded shadow mr-2"
              onClick={handleSaveSegment}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded shadow"
              onClick={() => setIsPopupOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
