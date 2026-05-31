"use client";

import { useState } from "react";
import Link from "next/link";

interface CauseOption {
  id: string;
  name: string;
  emoji: string;
  costPKR: number;
  costUSD: number;
  unit: string;
  impactDesc: string;
  impactFn: (qty: number) => string;
}

const causeOptions: CauseOption[] = [
  {
    id: "water",
    name: "Clean Water",
    emoji: "💧",
    costPKR: 25000,
    costUSD: 90,
    unit: "Well",
    impactDesc: "Installs a hand pump & filtration setup for a dry village.",
    impactFn: (qty) => `Provides fresh, clean drinking water to ${qty * 150}+ villagers in desert regions.`,
  },
  {
    id: "housing",
    name: "Safe Shelter",
    emoji: "🏠",
    costPKR: 250000,
    costUSD: 900,
    unit: "Home",
    impactDesc: "Builds a brick-and-mortar resilient home for families.",
    impactFn: (qty) => `Restores dignity, safety, and shelter for ${qty * 6}+ displaced flood victims.`,
  },
  {
    id: "relief",
    name: "Emergency Pack",
    emoji: "📦",
    costPKR: 5000,
    costUSD: 18,
    unit: "Pack",
    impactDesc: "Emergency food package, warm blanket & medical kit.",
    impactFn: (qty) => `Feeds and supports ${qty} family of 6 members for a full month during crises.`,
  },
];

export default function ImpactCalculator() {
  const [selectedCause, setSelectedCause] = useState<CauseOption>(causeOptions[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [customVal, setCustomVal] = useState<string>("");
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const increment = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const totalPKR = selectedCause.costPKR * quantity;
  const totalUSD = selectedCause.costUSD * quantity;

  // Custom value calculation
  const customNum = parseFloat(customVal) || 0;
  const customPercentage = selectedCause.costPKR > 0 ? (customNum / selectedCause.costPKR) * 100 : 0;

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomVal(value);
    }
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "var(--radius)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "32px",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative Glow */}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: "-30px",
          width: "100px",
          height: "100px",
          background: "var(--gold)",
          borderRadius: "50%",
          filter: "blur(50px)",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      ></div>

      <h3
        style={{
          fontSize: "20px",
          color: "var(--white)",
          marginBottom: "6px",
          fontFamily: "var(--font-playfair)",
          fontWeight: 700,
        }}
      >
        Live Impact Calculator
      </h3>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "24px" }}>
        Choose a cause to see how your contribution changes lives.
      </p>

      {/* Select Cause Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {causeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setSelectedCause(option);
              setIsCustomMode(false);
              setQuantity(1);
            }}
            style={{
              flex: 1,
              padding: "12px 8px",
              borderRadius: "12px",
              background: selectedCause.id === option.id ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.01)",
              border: selectedCause.id === option.id ? "1.5px solid var(--green-light)" : "1.5px solid rgba(255, 255, 255, 0.06)",
              color: selectedCause.id === option.id ? "var(--white)" : "var(--text-muted)",
              fontSize: "12px",
              fontWeight: 600,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span style={{ fontSize: "18px" }}>{option.emoji}</span>
            <span>{option.name}</span>
          </button>
        ))}
      </div>

      {/* Mode Selector */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px" }}>
        <button
          onClick={() => setIsCustomMode(false)}
          style={{
            background: "none",
            border: "none",
            color: !isCustomMode ? "var(--gold-light)" : "var(--text-muted)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            padding: "4px 0",
            borderBottom: !isCustomMode ? "2px solid var(--gold)" : "2px solid transparent",
          }}
        >
          Select Quantity
        </button>
        <button
          onClick={() => setIsCustomMode(true)}
          style={{
            background: "none",
            border: "none",
            color: isCustomMode ? "var(--gold-light)" : "var(--text-muted)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            padding: "4px 0",
            borderBottom: isCustomMode ? "2px solid var(--gold)" : "2px solid transparent",
          }}
        >
          Custom Amount
        </button>
      </div>

      {/* Calculator Body */}
      {!isCustomMode ? (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--white)" }}>Quantity:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={decrement}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.02)",
                  color: "var(--white)",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--green-light)";
                  e.currentTarget.style.background = "rgba(16, 185, 129, 0.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                }}
              >
                −
              </button>
              <span style={{ fontSize: "20px", fontWeight: 700, minWidth: "28px", textAlign: "center", color: "var(--white)" }}>
                {quantity}
              </span>
              <button
                onClick={increment}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.02)",
                  color: "var(--white)",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--green-light)";
                  e.currentTarget.style.background = "rgba(16, 185, 129, 0.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                }}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>Total Investment:</span>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--gold-light)", display: "block" }}>
                Rs {totalPKR.toLocaleString()}
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                approx. ${totalUSD.toLocaleString()} USD
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
            <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--white)" }}>
              Enter Donation Amount (PKR):
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "14px", fontWeight: 600 }}>
                Rs
              </span>
              <input
                type="text"
                value={customVal}
                onChange={handleCustomChange}
                placeholder="e.g. 10000"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 38px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.02)",
                  color: "var(--white)",
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {customNum > 0 && (
            <div style={{ background: "rgba(255, 255, 255, 0.01)", padding: "12px", borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.06)", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>
                Your donation covers:
              </span>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--white)" }}>
                {customPercentage >= 100 ? (
                  `🎉 ${(customPercentage / 100).toFixed(1)}x full ${selectedCause.unit}s!`
                ) : (
                  `💪 ${customPercentage.toFixed(0)}% of 1 full ${selectedCause.unit}`
                )}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Output Impact Banner */}
      <div
        style={{
          background: "rgba(16, 185, 129, 0.04)",
          border: "1px solid rgba(16, 185, 129, 0.15)",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--green-light)",
            marginBottom: "6px",
          }}
        >
          Forecasted Impact:
        </span>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            color: "var(--white)",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {!isCustomMode ? (
            selectedCause.impactFn(quantity)
          ) : customNum > 0 ? (
            customPercentage >= 100 ? (
              selectedCause.impactFn(Math.floor(customPercentage / 100))
            ) : (
              `Contributes ${customPercentage.toFixed(0)}% towards a new ${selectedCause.unit}. Every drop counts.`
            )
          ) : (
            "Enter an amount to calculate the projected lives impacted."
          )}
        </p>
      </div>

      {/* Link to Donate Form */}
      <Link
        href="/contact"
        className="btn btn-primary"
        style={{
          width: "100%",
          padding: "14px",
          justifyContent: "center",
          borderRadius: "12px",
          boxSizing: "border-box",
        }}
      >
        Send Donation Request
      </Link>
    </div>
  );
}
