import TextInput from "components/InputFields/TextInput";
import React from "react";

export default function IssuerForm() {
  return (
    <div className="px-14 py-[50px] bg-primary-light min-h-screen">
      <div className="font-normal text-2xl">Form</div>
      <div className="mt-8">
        <div className="bg-white rounded-lg p-8">
          <div className="font-regular text-xl">Details</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-8">
            <TextInput label={"Name"} placeholder={"John"} border="all" />
            <TextInput label={"Relation"} placeholder={"son"} border="all" />
            <TextInput label={"Father"} placeholder={"Jack"} border="all" />
            <TextInput label={"Mother"} placeholder={"Jane"} border="all" />
            <TextInput label={"City"} placeholder={"Baraipur"} border="all" />
            <TextInput label={"Tehsil"} placeholder={"Gola"} border="all" />
            <TextInput
              label={"District"}
              placeholder={"Gorakhpur"}
              border="all"
            />
            <TextInput
              label={"State"}
              placeholder={"Utter Pradesh"}
              border="all"
            />
            <TextInput label={"Community"} placeholder={"Ahir"} border="all" />
            <TextInput label={"Class"} placeholder={"OBC"} border="all" />
          </div>
        </div>
      </div>
    </div>
  );
}
