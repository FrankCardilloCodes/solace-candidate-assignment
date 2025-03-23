"use client";

import { useEffect, useState } from "react";
import { Advocate } from '../types';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTermType, setSearchTermType] = useState<string>('firstName');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const filterSpecialties = (specialties: string[], searchTerm: string): boolean => {
    const lowerCaseSpecialties = specialties.map((specialty) => specialty.toLowerCase());
    const joinedSpecialties = lowerCaseSpecialties.join(' ');

    return joinedSpecialties.includes(searchTerm.toLowerCase());
  };

  const onChange = (e: { target: { value: string; }; }) => {
    const currentSearchTerm = e.target.value;
    setSearchTerm(currentSearchTerm);
    document.getElementById("search-term")!.innerHTML = currentSearchTerm;
  }

  const onSearchClick = () => {
    const recentlyFilteredAdvocates = advocates.filter((advocate) => {
      if (searchTermType === 'specialty') {
        return filterSpecialties(advocate.specialties, searchTerm);
      }

      if (searchTermType === 'yearsOfExperience') {
        return advocate.yearsOfExperience.toString().includes(searchTerm);
      }

      if (typeof advocate[searchTermType] === 'string') {
        return advocate[searchTermType].toLowerCase().includes(searchTerm.toLowerCase());
      }      
    });

    setFilteredAdvocates(recentlyFilteredAdvocates);
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
          <option value="degree">Degree</option>
          <option value="specialty">Specialty</option>
          <option value="yearsOfExperience">Years of Experience</option>
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
