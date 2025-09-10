import {useState, useEffect} from "react";
import {Box, Input, Kbd, IconButton, Select as ChakraSelect, Text} from "@chakra-ui/react";
import {LuSearch, LuX, LuChevronDown} from "react-icons/lu";

const SearchInput = ({
  placeholder = "Search",
  onSearch,
  showKeyboardShortcut = true,
  size = "md",
  variant = "filled",
  bg = "gray.800",
  focusBorderColor = "blue.400",
  borderColor = "gray.600",
  color = "#fff",
  placeholderStyle = {
    color: "#85888E",
    fontSize: "16px",
  },
  ...props
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        const searchInput = document.querySelector("[data-search-input]");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <Box position="relative" {...props}>
      <Box position="relative">
        <Box
          position="absolute"
          left="12px"
          top="50%"
          transform="translateY(-50%)"
          color="gray.400"
          zIndex={1}
          pointerEvents="none">
          <LuSearch size={20} />
        </Box>

        <Input
          data-search-input
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          variant={variant}
          bg={bg}
          border="1px solid"
          borderColor={isFocused ? focusBorderColor : borderColor}
          color={color}
          _placeholder={{...placeholderStyle}}
          _focus={{
            borderColor: focusBorderColor,
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
          }}
          borderRadius="lg"
          pl="40px"
          pr={showKeyboardShortcut ? "80px" : "20px"}
          size={size}
        />

        <Box
          position="absolute"
          right="8px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}>
          {searchValue ? (
            <IconButton
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{color: "white", bg: "gray.700"}}
              onClick={handleClear}
              aria-label="Clear search">
              <LuX size={12} />
            </IconButton>
          ) : showKeyboardShortcut ? (
            <Kbd
              fontSize="xs"
              bg="gray.700"
              color="gray.300"
              border="1px solid"
              borderColor="gray.600"
              px={2}
              py={1}
              borderRadius="md">
              ⌘K
            </Kbd>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

const Select = ({
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
  size = "md",
  variant = "outline",
  bg = "white",
  borderColor = "gray.200",
  focusBorderColor = "blue.400",
  color = "gray.700",
  placeholderStyle = {
    color: "#6B7280",
    fontSize: "16px",
  },
  iconColor = "#6B7280",
  iconSize = 20,
  showIcon = true,
  isDisabled = false,
  isRequired = false,
  isInvalid = false,
  errorBorderColor = "red.400",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Box position="relative" {...props}>
      <Box position="relative">
        <ChakraSelect
          value={value || ""}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          variant={variant}
          bg={bg}
          border="1px solid"
          borderColor={
            isInvalid
              ? errorBorderColor
              : isFocused
              ? focusBorderColor
              : borderColor
          }
          color={color}
          _placeholder={{...placeholderStyle}}
          _focus={{
            borderColor: isInvalid ? errorBorderColor : focusBorderColor,
            boxShadow: `0 0 0 1px var(--chakra-colors-${isInvalid ? 'red' : 'blue'}-400)`,
          }}
          _invalid={{
            borderColor: errorBorderColor,
            boxShadow: `0 0 0 1px var(--chakra-colors-red-400)`,
          }}
          borderRadius="lg"
          pr={showIcon ? "40px" : "20px"}
          pl="16px"
          size={size}
          isDisabled={isDisabled}
          isRequired={isRequired}
          isInvalid={isInvalid}
          cursor={isDisabled ? "not-allowed" : "pointer"}
          opacity={isDisabled ? 0.6 : 1}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} disabled={option.isDisabled}>
              {option.label}
            </option>
          ))}
        </ChakraSelect>

        {showIcon && (
          <Box
            position="absolute"
            right="12px"
            top="50%"
            transform="translateY(-50%)"
            color={iconColor}
            zIndex={1}
            pointerEvents="none">
            <LuChevronDown size={iconSize} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export {SearchInput, Select};
export default SearchInput;
