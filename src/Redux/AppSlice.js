import { createSlice } from "@reduxjs/toolkit";
import react from "./../Assets/Images/react.png";

export const AppSlice = createSlice({
  name: "App",
  initialState: [
    {
      title: "Teacher",
      selected: false,
    },
    {
      selected: false,
      title: "Nurse",
    },
    {
      selected: false,
      title: "Fundraiser",
    },
    {
      selected: false,
      title: "Project Manager",
    },
    {
      selected: false,
      title: "Sanitary Worker",
    },
    {
      selected: false,
      title: "Financer",
    },
    {
      title: "Community Organiser",
      selected: false,
    },
    {
      title: "Public Relations",
      selected: false,
    },
    {
      title: "Medical Worker",
      selected: false,
    },
    {
      title: "Legal Advisor",
      selected: false,
    },
    {
      title: "Content Writer",
      selected: false,
    },
    {
      title: "IT Specialist",
      selected: false,
    },
  ],
  reducers: {
    AddApp: (state, action) => {
      state.push(action.payload);
    },
    ChangeApp: (state, action) => {
      state.map((app) => {
        if (app.title === action.payload.title) {
          app.selected = action.payload.selected;
        }
        return app;
      });
      
    },
    unSelect: (state, action) => {
      state.map((app) => {
        app.selected = action.payload;
        return app;
      });
      console.log(state)
    },
  },
});

export const { AddApp, ChangeApp, unSelect } = AppSlice.actions;
export default AppSlice.reducer;
