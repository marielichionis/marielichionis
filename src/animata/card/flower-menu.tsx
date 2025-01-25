import { useState, useContext } from "react";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";
import { Year, Data } from "../../App.jsx";
type FlowerMenuProps = {
  menuItems: [];
  iconColor?: string;
  backgroundColor?: string;
  animationDuration?: number;
  togglerSize?: number;
  json: [];
};

const MenuToggler = ({
  isOpen,
  onChange,
  backgroundColor,
  iconColor,
  animationDuration,
  togglerSize,
  iconSize,
}: {
  isOpen: boolean;
  onChange: () => void;
  backgroundColor: string;
  iconColor: string;
  animationDuration: number;
  togglerSize: number;
  iconSize: number;
}) => {
  const lineHeight = iconSize * 0.1;
  const lineWidth = iconSize * 0.8;
  const lineSpacing = iconSize * 0.25;

  return (
    <>
      <input
        id="menu-toggler"
        type="checkbox"
        checked={isOpen}
        onChange={onChange}
        className="absolute inset-0 z-10 m-auto cursor-pointer opacity-0"
        style={{ width: togglerSize, height: togglerSize }}
      />
      <label
        htmlFor="menu-toggler"
        className="absolute inset-0 z-20 m-auto flex cursor-pointer items-center justify-center rounded-full transition-all"
        style={{
          backgroundColor,
          color: iconColor,
          transitionDuration: `${animationDuration}ms`,
          width: togglerSize,
          height: togglerSize,
        }}
      >
        <span
          className="relative flex flex-col items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`absolute bg-current transition-all ${
                isOpen && i === 0
                  ? "opacity-0"
                  : isOpen
                  ? `${i === 1 ? "rotate-45" : "-rotate-45"}`
                  : ""
              }`}
              style={{
                transitionDuration: `${animationDuration}ms`,
                width: lineWidth,
                height: lineHeight,
                top: isOpen
                  ? `calc(50% - ${lineHeight / 2}px)`
                  : `calc(50% + ${(i - 1) * lineSpacing}px - ${
                      lineHeight / 2
                    }px)`,
              }}
            />
          ))}
        </span>
      </label>
    </>
  );
};

const MenuItem = ({
  item,
  index,
  isOpen,
  backgroundColor,
  animationDuration,
  itemCount,
  itemSize,
  json,
}) => {
  const { setYear } = useContext(Year);
  const handleClick = () => {
    console.log("click", item);

    const dat = json.filter(
      (el) => format(new Date(el.time), "yyyy") === String(item)
    );
    console.log(dat);
    setYear(String(item));

    const year = item;
    return (
      <div>
        <Navigate to="Wrapped" state={{ dat, year, json }} replace={true} />
      </div>
    );
  };
  return (
    <div
      className={`absolute inset-0 m-auto transition-all ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: itemSize,
        height: itemSize,
        transform: isOpen
          ? `rotate(${(360 / itemCount) * index}deg) translateX(-${
              itemSize + 30
            }px)`
          : "none",
        transitionDuration: `${animationDuration}ms`,
      }}
    >
      <input
        onClick={handleClick}
        className={`flex z-10 m-auto text-center cursor-pointer h-full w-full items-center justify-center rounded-full opacity-60 transition-all duration-100 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        } group hover:scale-125 hover:opacity-100`}
        value={item}
        style={{
          backgroundColor,
          color: "#ffffff",
          transform: `rotate(-${(360 / itemCount) * index}deg)`,
          transitionDuration: `${animationDuration}ms`,
        }}
      ></input>
    </div>
  );
};

export default function FlowerMenu({
  menuItems,
  iconColor = "white",
  backgroundColor = "rgba(255, 255, 255, 0.2)",
  animationDuration = 500,
  togglerSize = 30,
  json,
}: FlowerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = menuItems.length;
  const itemSize = togglerSize * 1.5;
  const iconSize = Math.max(24, Math.floor(togglerSize * 0.6));

  return (
    <nav
      className="absolute z-10"
      style={{ width: itemSize * 4, height: itemSize * 4 }}
    >
      <MenuToggler
        isOpen={isOpen}
        onChange={() => setIsOpen(!isOpen)}
        backgroundColor={backgroundColor}
        iconColor={iconColor}
        animationDuration={animationDuration}
        togglerSize={togglerSize}
        iconSize={iconSize}
      />
      <div className="absolute inset-0 m-0 h-full w-full">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            index={index}
            isOpen={isOpen}
            backgroundColor={backgroundColor}
            animationDuration={animationDuration}
            itemCount={itemCount}
            itemSize={itemSize}
            json={json}
          />
        ))}
      </div>
    </nav>
  );
}
