"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

function normalizeOption(option) {
  if (typeof option !== "object" || option === null) {
    return { value: option, label: String(option).replaceAll("_", " ") };
  }

  return {
    value: option.value,
    label: option.label ?? String(option.value).replaceAll("_", " "),
  };
}

function normalizeGroups({ groups = [], options = [] }) {
  if (groups.length) {
    return groups.map((group) => ({
      label: group.label,
      options: group.options.map(normalizeOption),
    }));
  }

  return [
    {
      label: "",
      options: options.map(normalizeOption),
    },
  ];
}

export default function ThemedSelect({
  value,
  onChange,
  groups,
  options,
  ariaLabel,
  placeholder = "Select",
}) {
  const id = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const normalizedGroups = useMemo(() => normalizeGroups({ groups, options }), [groups, options]);
  const flatOptions = useMemo(
    () => normalizedGroups.flatMap((group) => group.options),
    [normalizedGroups]
  );
  const currentValue = value == null ? "" : String(value);
  const selectedIndex = Math.max(
    0,
    flatOptions.findIndex((option) => String(option.value) === currentValue)
  );
  const selectedOption = flatOptions.find((option) => String(option.value) === currentValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [open]);

  const selectOption = (option) => {
    onChange?.({ target: { value: option.value } });
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openMenu = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const moveActive = (direction) => {
    setActiveIndex((current) => {
      const size = flatOptions.length;
      if (!size) return 0;
      return (current + direction + size) % size;
    });
  };

  const handleKeyDown = (event) => {
    if (!flatOptions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        moveActive(1);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        moveActive(-1);
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) {
        selectOption(flatOptions[activeIndex]);
      } else {
        openMenu();
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={`theme-select ${open ? "is-open" : ""}`} ref={rootRef}>
      <button
        ref={triggerRef}
        className="theme-select-trigger"
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            openMenu();
          }
        }}
        onKeyDown={handleKeyDown}
      >
        <span className="theme-select-value">{selectedOption?.label ?? placeholder}</span>
        <ChevronDown className="theme-select-icon" size={18} aria-hidden="true" />
      </button>

      {open && (
        <div className="theme-select-menu" id={`${id}-menu`} role="listbox" aria-label={ariaLabel}>
          {normalizedGroups.map((group, groupIndex) => {
            const offset = normalizedGroups
              .slice(0, groupIndex)
              .reduce((total, current) => total + current.options.length, 0);

            return (
              <div className="theme-select-group" key={group.label || `group-${groupIndex}`}>
                {group.label && <div className="theme-select-group-label">{group.label}</div>}
                {group.options.map((option, optionIndex) => {
                  const flatIndex = offset + optionIndex;
                  const selected = String(option.value) === currentValue;
                  const active = flatIndex === activeIndex;

                  return (
                    <button
                      className={`theme-select-option ${selected ? "is-selected" : ""} ${active ? "is-active" : ""}`}
                      id={`${id}-option-${flatIndex}`}
                      key={String(option.value)}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setActiveIndex(flatIndex)}
                      onClick={() => selectOption(option)}
                    >
                      <span>{option.label}</span>
                      {selected && <Check size={15} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
