import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";

const CommunicationTab = ({userId}) => {
  const communicationSettings = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    systemUpdates: true,
    securityAlerts: true,
    primaryEmail: "john.doe@example.com",
    secondaryEmail: "",
    phoneNumber: "+1 (555) 123-4567",
    timezone: "UTC-8 (Pacific Time)",
    language: "English",
  };

  return (
    <Box>
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between" align="center">
          <Text fontSize="20px" fontWeight="600" color="#1e293b">
            Communication Preferences
          </Text>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="blue"
            variant="outline"
            size="sm">
            Edit Settings
          </Button>
        </HStack>

        <Box>
          <Text fontSize="18px" fontWeight="600" color="#1e293b" mb={4}>
            Contact Information
          </Text>
          <Box
            bg="gray.50"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200">
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Text fontWeight="500" color="gray.600" minW="140px">
                  Primary Email:
                </Text>
                <Text color="gray.800">
                  {communicationSettings.primaryEmail}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="500" color="gray.600" minW="140px">
                  Secondary Email:
                </Text>
                <Text color="gray.800">
                  {communicationSettings.secondaryEmail || "Not set"}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="500" color="gray.600" minW="140px">
                  Phone Number:
                </Text>
                <Text color="gray.800">
                  {communicationSettings.phoneNumber}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="500" color="gray.600" minW="140px">
                  Timezone:
                </Text>
                <Text color="gray.800">{communicationSettings.timezone}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="500" color="gray.600" minW="140px">
                  Language:
                </Text>
                <Text color="gray.800">{communicationSettings.language}</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        {/* Notification Settings */}
        <Box>
          <Text fontSize="18px" fontWeight="600" color="#1e293b" mb={4}>
            Notification Settings
          </Text>
          <Box
            bg="gray.50"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200">
            <VStack align="stretch" spacing={4}>
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <FormLabel mb="0" color="gray.800">
                  Email Notifications
                </FormLabel>
                <Switch
                  isChecked={communicationSettings.emailNotifications}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <FormLabel mb="0" color="gray.800">
                  SMS Notifications
                </FormLabel>
                <Switch
                  isChecked={communicationSettings.smsNotifications}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <FormLabel mb="0" color="gray.800">
                  Push Notifications
                </FormLabel>
                <Switch
                  isChecked={communicationSettings.pushNotifications}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <FormLabel mb="0" color="gray.800">
                  Marketing Emails
                </FormLabel>
                <Switch
                  isChecked={communicationSettings.marketingEmails}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <FormLabel mb="0" color="gray.800">
                  System Updates
                </FormLabel>
                <Switch
                  isChecked={communicationSettings.systemUpdates}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <FormLabel mb="0" color="gray.800">
                  Security Alerts
                </FormLabel>
                <Switch
                  isChecked={communicationSettings.securityAlerts}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default CommunicationTab;
