import TextInput from "components/InputFields/TextInput";
import React from "react";
// import { MdAddBox } from "react-icons/md";
import { useState } from "react";
import FilledPrimary from "components/Buttons/Filled-primary";

export default function IssuerForm() {
  const [details, setDetails] = useState({
    name: "",
    relation: "",
    father: "",
    mother: "",
    city: "",
    tehsil: "",
    district: "",
    state: "",
    community: "",
    class: "",
  });

  const [associated, setAssociated] = useState([]);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log({ ...details, associated });
  };

  return (
    <div className="px-14 py-[50px] bg-primary-light min-h-screen">
      <div className="font-normal text-2xl">Form</div>
      <div className="mt-8">
        <div className="bg-white rounded-lg p-8">
          <div className="font-regular text-xl">Details</div>
          <div className="grid grid-cols-1 sm:gap-10 gap-4 sm:grid-cols-2 mt-8">
            <TextInput
              label={"Name"}
              name="name"
              handleChange={handleChange}
              placeholder={"John"}
              border="all"
            />
            <TextInput
              label={"Relation"}
              name="relation"
              handleChange={handleChange}
              placeholder={"son"}
              border="all"
            />
            <TextInput
              label={"Father"}
              name="father"
              handleChange={handleChange}
              placeholder={"Jack"}
              border="all"
            />
            <TextInput
              label={"Mother"}
              name="mother"
              handleChange={handleChange}
              placeholder={"Jane"}
              border="all"
            />
            <TextInput
              label={"City"}
              name="city"
              handleChange={handleChange}
              placeholder={"Baraipur"}
              border="all"
            />
            <TextInput
              label={"Tehsil"}
              name="tehsil"
              handleChange={handleChange}
              placeholder={"Gola"}
              border="all"
            />
            <TextInput
              label={"District"}
              name="district"
              handleChange={handleChange}
              placeholder={"Gorakhpur"}
              border="all"
            />
            <TextInput
              label={"State"}
              name="state"
              handleChange={handleChange}
              placeholder={"Utter Pradesh"}
              border="all"
            />
            <TextInput
              label={"Community"}
              handleChange={handleChange}
              name="community"
              placeholder={"Ahir"}
              border="all"
            />
            <TextInput
              label={"Class"}
              handleChange={handleChange}
              name="class"
              placeholder={"OBC"}
              border="all"
            />
          </div>
          <div className="mt-8 grid grid-col-3 gap-3">
            <TextInput
              label={"Associated"}
              handleChange={(e) => setAssociated([e.target.value])}
              name="associated"
              placeholder={"Government of India, Ministry of We.."}
              border="all"
            />
            {/* <MdAddBox className="text-[50px]" type="button" /> */}
          </div>
          <div className="mt-8 grid grid-col-3 gap-3">
            <FilledPrimary text={"Submit"} handleClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
