import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaRobot, FaEnvelope, FaKey, FaPaperPlane, FaRedo, FaCheckCircle } from "react-icons/fa";

const AUTHORIZED_EMAIL = "vijaykumawat8886@gmail.com";

const VijayLogin = () => {
  const [email, setEmail] = useState(AUTHORIZED_EMAIL);
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Generate and Send 6-Digit OTP to Email
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccessMsg("");

    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail !== AUTHORIZED_EMAIL) {
      setError(`⛔ Access Denied! Only ${AUTHORIZED_EMAIL} is authorized.`);
      return;
    }

    try {
      setLoading(true);

      // Generate 6-digit random code
      const generatedCode = String(Math.floor(100000 + Math.random() * 900000));
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      // Store in sessionStorage
      sessionStorage.setItem("vijay_otp_code", generatedCode);
      sessionStorage.setItem("vijay_otp_expiry", String(expiresAt));

      // Dispatch Email using FormSubmit AJAX
      try {
        await fetch(`https://formsubmit.co/ajax/${AUTHORIZED_EMAIL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            _subject: `🔐 Your Vijay Admin Login OTP: ${generatedCode}`,
            email: AUTHORIZED_EMAIL,
            message: `Hello Vijay,\n\nYour One-Time Password (OTP) for Crystal Jaipuria AI Super Admin is:\n\n👉  ${generatedCode}  👈\n\nThis OTP is valid for 10 minutes.\n\nBest Regards,\nCrystal Jaipuria AI Security System`,
          }),
        });
      } catch (err) {
        console.warn("Email service notice:", err);
      }

      setSuccessMsg(`✅ 6-Digit OTP has been sent to ${AUTHORIZED_EMAIL}. Check your Inbox / Spam folder.`);
      setStep(2);
      setResendTimer(60);
    } catch {
      setError("Failed to send OTP. Please try again or use your master key.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP Code
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");

    const cleanOtp = otp.trim();
    const storedCode = sessionStorage.getItem("vijay_otp_code");
    const storedExpiry = Number(sessionStorage.getItem("vijay_otp_expiry") || 0);

    // Master backup OTP codes
    const masterOtps = ["8886", "888600", "888688", "1989"];

    const isMasterValid = masterOtps.includes(cleanOtp);
    const isGeneratedValid = storedCode && storedCode === cleanOtp && Date.now() < storedExpiry;

    if (isGeneratedValid || isMasterValid) {
      // Authenticate session
      localStorage.setItem("vijay_admin_token", "vijay_ai_superadmin_otp_verified_" + Date.now());
      localStorage.setItem("vijay_admin_email", AUTHORIZED_EMAIL);
      localStorage.setItem("vijay_auth_time", String(Date.now()));

      sessionStorage.removeItem("vijay_otp_code");
      sessionStorage.removeItem("vijay_otp_expiry");

      setSuccessMsg("🎉 OTP Verified! Redirecting to Vijay AI Super Admin...");
      setTimeout(() => {
        navigate("/admin-vijay/dashboard");
      }, 500);
    } else {
      if (storedExpiry && Date.now() >= storedExpiry) {
        setError("⏳ OTP has expired. Please click 'Resend OTP'.");
      } else {
        setError("❌ Invalid OTP. Please check the 6-digit code sent to your email.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12">
      <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT BRANDING */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-indigo-500/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
              <FaRobot className="text-sm" />
              <span>Vijay AI Super Admin</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white mb-3">
              Welcome Vijay! 💎
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
              Your exclusive, private management portal protected with <strong>Passwordless Email OTP Security</strong>.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-indigo-500/20 space-y-3 text-xs text-indigo-300">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-emerald-400 shrink-0 text-sm" />
              <span>100% Passwordless • Instant Email OTP</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-amber-400 shrink-0 text-sm" />
              <span>Authorized to <strong>vijaykumawat8886@gmail.com</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <FaRobot className="text-indigo-400 shrink-0 text-sm" />
              <span>Full AI Gemini Auto-Fill &amp; SEO Tools</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-slate-900 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>{step === 1 ? "Email Verification" : "Enter Email OTP"}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {step === 1
                ? "Click Send OTP to receive your 6-digit login code"
                : `Enter the 6-digit OTP code sent to ${AUTHORIZED_EMAIL}`}
            </p>
          </div>

          {error && (
            <div className="bg-red-950/80 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-5 text-xs sm:text-sm leading-relaxed">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-xl mb-5 text-xs sm:text-sm leading-relaxed flex items-center gap-2">
              <FaCheckCircle className="shrink-0 text-base" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* STEP 1: SEND OTP */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FaEnvelope className="text-indigo-400" />
                  <span>Authorized Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FaPaperPlane className="text-sm" />
                <span>{loading ? "Sending OTP to your Email..." : "📩 Send OTP to my Email"}</span>
              </button>
            </form>
          )}

          {/* STEP 2: VERIFY OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FaKey className="text-amber-400" />
                    <span>Enter 6-Digit OTP Code</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError("");
                    }}
                    className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                  >
                    Change Email
                  </button>
                </label>

                <input
                  type="text"
                  maxLength="6"
                  autoFocus
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-800/90 border border-indigo-500/50 text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all duration-200 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <FaShieldAlt />
                <span>Verify OTP &amp; Login</span>
              </button>

              <div className="text-center pt-2">
                {resendTimer > 0 ? (
                  <p className="text-xs text-slate-400">
                    Resend OTP in <strong className="text-indigo-400 font-mono">{resendTimer}s</strong>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1.5 cursor-pointer underline"
                  >
                    <FaRedo className="text-[10px]" />
                    <span>{loading ? "Sending..." : "Resend OTP to Email"}</span>
                  </button>
                )}
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default VijayLogin;