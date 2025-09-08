import {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import styles from "./MultiStepRegister.module.scss";
import {useForm} from "react-hook-form";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const {control, handleSubmit, getValues, reset, watch} = useForm({
    defaultValues: {
      companyName: "",
      fmcsa: "",
      carrierIdentifier: "",
      legalName: "",
      usdot: "",
      mc: "",
      operatingStatus: "",
      mailingAddress: "",

      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",

      email: "",
      phone: "",

      emailCode: "",
      phoneCode: "",
    },
  });
  const [formData, setFormData] = useState({
    companyName: "",
    fmcsa: "",
    carrierIdentifier: "",
    legalName: "",
    usdot: "",
    mc: "",
    operatingStatus: "",
    mailingAddress: "",

    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    email: "",
    phone: "",

    emailCode: "",
    phoneCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    } else {
      navigate("/role-selection");
    }
  }, [location.state, navigate]);

  const steps = [
    {id: 1, title: "Your details", completed: currentStep > 1},
    {id: 2, title: "Address", completed: currentStep > 2},
    {id: 3, title: "Email and Phone number", completed: currentStep > 3},
    {id: 4, title: "Verification", completed: false},
  ];

  const handleChange = (e) => {
    reset({
      ...getValues(),
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/admin/dashboard");
    }, 1000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company name *</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={watch("companyName")}
                onChange={handleChange}
                required
                placeholder="Company name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fmcsa">FMCSA *</label>
              <div className={styles.inputWithDropdown}>
                <input
                  type="text"
                  id="fmcsa"
                  name="fmcsa"
                  value={watch("fmcsa")}
                  onChange={handleChange}
                  required
                  placeholder="e.g., USDOT 1234567 or MC 654321"
                />
                <span className={styles.dropdownIcon}>▼</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="carrierIdentifier">Carrier Identifier *</label>
              <input
                type="text"
                id="carrierIdentifier"
                name="carrierIdentifier"
                value={watch("carrierIdentifier")}
                onChange={handleChange}
                required
                placeholder="SCAC"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <div className={styles.formGroup}>
              <label htmlFor="addressLine1">Address Line 1 *</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={watch("addressLine1")}
                onChange={handleChange}
                required
                placeholder="606 Hillrose Ave Unit B"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={watch("addressLine2")}
                onChange={handleChange}
                placeholder="Address Line 2 (Optional)"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={watch("city")}
                  onChange={handleChange}
                  required
                  placeholder="Dayton"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state">State *</label>
                <div className={styles.inputWithDropdown}>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={watch("state")}
                    onChange={handleChange}
                    required
                    placeholder="OH"
                  />
                  <span className={styles.dropdownIcon}>▼</span>
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="zipCode">Zip code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={watch("zipCode")}
                  onChange={handleChange}
                  required
                  placeholder="45404"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="country">Country</label>
                <div className={styles.inputWithDropdown}>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={watch("country")}
                    onChange={handleChange}
                    placeholder="United States"
                  />
                  <span className={styles.dropdownIcon}>▼</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email or phone number *</label>
              <input
                type="text"
                id="email"
                name="email"
                value={watch("email")}
                onChange={handleChange}
                required
                placeholder="name@domain.com or +1 555-123-4567"
              />
              <small>We'll send a one-time code to what you enter.</small>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.stepContent}>
            <div className={styles.verificationContent}>
              <div className={styles.verificationIcon}>
                <img src="/img/mail.svg" alt="" />
              </div>
              <h3>Check your email</h3>
              <p>
                We sent a verification link to{" "}
                {watch("email") || "bahridnurullav@gmail.com"}
              </p>

              <div className={styles.verificationContentOtp}>
                <div className={styles.verificationCode}>
                  <input type="text" maxLength="1" />
                  <input type="text" maxLength="1" />
                  <input type="text" maxLength="1" />
                  <input type="text" maxLength="1" />
                </div>

                <button type="button" className={styles.verifyBtn}>
                  Verify email
                </button>
              </div>

              <p className={styles.resendText}>
                Didn't receive the email?{" "}
                <span className={styles.resendLink}>Click to resend</span>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!role) {
    return null;
  }

  return (
    <div className={styles.multiStepContainer}>
      <div className={styles.sidebar}>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div
              key={step.id}
              className={`${styles.step} ${
                currentStep === step.id ? styles.active : ""
              } ${step.completed ? styles.completed : ""}`}>
              <div className={styles.stepIndicator}></div>
              <span className={styles.stepTitle}>{step.title}</span>
            </div>
          ))}
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerLeft}>© Lodify 2025</div>
          <div className={styles.footerRight}>
            <img src="/img/mailIcon.svg" alt="" /> help@lodify.com
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.formContainer}>
          {currentStep !== 4 && (
            <>
              <h1>Create an account</h1>
              <p>Please enter your details.</p>
            </>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {currentStep < 4 && (
              <button
                type="button"
                className={styles.continueBtn}
                onClick={handleNext}
                disabled={isLoading}>
                {isLoading ? "Loading..." : "Continue"}
              </button>
            )}
          </form>

          <div className={styles.stepDots}>
            {steps.map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${
                  index + 1 === currentStep ? styles.active : ""
                }`}
              />
            ))}
          </div>

          <div className={styles.backLink}>
            <Link
              to={currentStep === 1 ? "/role-selection" : "#"}
              onClick={currentStep > 1 ? handleBack : undefined}>
              ← Back to {currentStep === 1 ? "role selection" : "details"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
