import React, {useEffect, useRef} from 'react'
import Model from '../../../../data/model'
import * as d3 from 'd3'

const PersonList = props => {
  console.log(props.data)

  // Data
  const dataset = props.data
  const d3Container = useRef(null)
  console.log(dataset)

  //Organisation
  let groupByOrganisation = d3
  .nest()
  .key(function(d) {
    return d.org_name
  })
  .entries(dataset)

  groupByOrganisation = groupByOrganisation.filter(organisation => {
      return organisation.key === "TILLÄMPAD FYSIKALISK KEMI";
  })
  console.log(groupByOrganisation)
  let organisation_trips = groupByOrganisation[0].values;

  //Lista med employees
  const employee_list = []
  const na_list = []
    organisation_trips.forEach(d => {
      if(d.employee != "N/A"){
        if(employee_list.includes(d.employee) === false){
          employee_list.push(d.employee)
        }
    }
    else{
      na_list.push(d.employee);
    }
      
    });
  console.log(employee_list);



  //Click function
  const chosen_employees_list = [];

  function chosenEmployee(evt,id){
    console.log(evt.target.className) //=inactive by default
    console.log(id);

   if (evt.target.className == "person_inactive"){
      evt.target.className = "person_active";
      if (chosen_employees_list.includes(id) === false){ //om personen inte finns i listan, lägg till
        chosen_employees_list.push(id);
      }
      
   } 
   else {
    evt.target.className = "person_inactive"
    if (chosen_employees_list.includes(id) === true){ //om personen finns i listan, ta bort
      const index = chosen_employees_list.indexOf(id);
      chosen_employees_list.splice(index,1);
  }
    }

    console.log(evt.target.className)
    console.log(chosen_employees_list)
    
    return chosen_employees_list;
  }

    return (
      <div>
          {employee_list.map(emp =>(
            <li key={emp} className="person_inactive" onClick={(e) => chosenEmployee(e,emp)}>Employee: {emp}</li>
          ))}
      </div>
  );

}

export default PersonList
