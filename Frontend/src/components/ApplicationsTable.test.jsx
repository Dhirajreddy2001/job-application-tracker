import {render, screen} from "@testing-library/react";
import ApplicationsTable from "./ApplicationsTable";

test("renders Applications table headers", () =>{
    render(<ApplicationsTable jobs= {[]}/>);
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Position/i)).toBeInTheDocument();
    expect(screen.getByText(/Application Date/i)).toBeInTHeDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();

});