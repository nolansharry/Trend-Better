import { useState } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function BlockedAccounts() {
    return (
        <div>
            <h2 className="settings-title">Blocked Accounts</h2>
            <p style={{ color: "#666", marginTop: "12px" }}>
                You haven't blocked any accounts yet. Blocked accounts won't be able to follow you or interact with your content.
            </p>
        </div>
    );
}