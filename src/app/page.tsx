"use client";

import { useEffect, useState } from "react";
import { Advocate } from '../types';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTermType, setSearchTermType] = useState<string>('firstName');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    }).catch((e) => alert('Oh No Server Error!'));
  }, []);

  const onChange = (e: { target: { value: string; }; }) => {
    const currentSearchTerm = e.target.value;
    setSearchTerm(currentSearchTerm);
    document.getElementById("search-term")!.innerHTML = currentSearchTerm;
  }

  const onSearchClick = () => {
    fetch(`/api/advocates?searchTermType=${searchTermType}&searchTerm=${searchTerm}`).then((response) => {
      response.json().then((jsonResponse) => {
        setFilteredAdvocates(jsonResponse.data);
      });
    }).catch((e) => alert('Oh No Server Error!'));
  };

  const onResetClick = () => {
    setSearchTerm('');
    document.getElementById("search-term")!.innerHTML = '';
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <select defaultValue="firstName" onChange={(e) => setSearchTermType(e.target.value)} name="advocate-attributes" id="advocate-attributes">
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="city">City</option>
          <option value="degree">Degree</option>
          {/* <option value="specialty">Specialty</option>
          <option value="yearsOfExperience">Years of Experience</option>
          <option value="phoneNumber">Phone Number</option> */}
        </select>
        <input style={{ border: "1px solid black" }} onChange={onChange} value={searchTerm} />
        <button onClick={onSearchClick}>Search</button>
        <span> | </span>
        <button onClick={onResetClick}>Reset</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
