import React from 'react'
import styles from '../styles/EOM.module.css'
function eom({ employee }) {
    console.log("employee:", employee)
    return (
        <div className="page-container">
            <div className={styles.main}>
                <h1>Employee of the month</h1>
                <div className={styles.employeeOfTheMonth}>
                    <h3>{employee.name}</h3>
                    <h6>{employee.positon}</h6>
                    <img src={employee.image} alt={employee.name} />
                    <p>{employee.name}</p>
                </div>
            </div>
        </div>
    )
};

//serverside call for page
export const getServerSideProps = async pageContext => {
    let endpoint = 'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth';
    const employee = await (await fetch(endpoint)).json();
    return { props: { employee } };

};

export default eom
