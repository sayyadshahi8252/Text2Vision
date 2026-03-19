import React, { useState } from "react";
import styles from "./Plans.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  payWithRazor,
  verifyRazor,
  getUserData,
} from "../redux/dataSlice/dataSlice";

const Plans = () => {
  const [isYearly, setIsYearly] = useState(false);

  const dispatch = useDispatch();
  const { user, paymentLoading, verifyLoading } = useSelector(
    (state) => state.data
  );

  const plans = [
    {
      name: "Starter",
      price: "10",
      credits: "8",
      desc: "Perfect for testing your first ideas.",
      features: ["8 AI Generations", "Standard Speed", "Community Access"],
      color: "#6366f1",
    },
    {
      name: "Pro",
      price: isYearly ? "180" : "200",
      credits: "220",
      desc: "The powerhouse for regular creators.",
      features: [
        "220 AI Generations",
        "Priority Queue",
        "Commercial License",
        "HD Upscaling",
      ],
      color: "#a855f7",
      popular: true,
    },
    {
      name: "Elite",
      price: isYearly ? "350" : "399",
      credits: "500",
      desc: "Unrestricted power for professionals.",
      features: [
        "500 AI Generations",
        "Private Mode",
        "Early Access",
        "24/7 Support",
      ],
      color: "#ec4899",
    },
  ];

  // 🔥 PAYMENT HANDLER (FINAL)
  const handlePayment = async (planName) => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      // 1️⃣ Create Razorpay Order
      const res = await dispatch(
        payWithRazor({ planId: planName })
      );

      if (res.meta.requestStatus !== "fulfilled") {
        alert("Payment failed to start ❌");
        return;
      }

      const { order, key } = res.payload;

      // 2️⃣ Open Razorpay
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "AI Image Generator",
        description: `${planName} Plan`,
        order_id: order.id,

        handler: async function (response) {
          console.log("Payment Success:", response);

          // 3️⃣ Verify Payment
          const verifyRes = await dispatch(verifyRazor(response));

          if (verifyRes.meta.requestStatus === "fulfilled") {
            alert("Payment successful & credits added ✅");

            // 4️⃣ Refresh user data
            dispatch(getUserData());
          } else {
            alert("Payment verification failed ❌");
          }
        },

        prefill: {
          name: user?.username || "",
          email: user?.email || "",
        },

        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Simple, <span>Fair Pricing</span>
        </h1>

        <div className={styles.toggleContainer}>
          <span className={!isYearly ? styles.activeLabel : ""}>
            Monthly
          </span>

          <div
            className={styles.switch}
            onClick={() => setIsYearly(!isYearly)}
          >
            <div
              className={`${styles.slider} ${
                isYearly ? styles.sliderRight : ""
              }`}
            ></div>
          </div>

          <span className={isYearly ? styles.activeLabel : ""}>
            Yearly <em className={styles.discount}>-20%</em>
          </span>
        </div>
      </div>

      {/* PLANS GRID */}
      <div className={styles.grid}>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              plan.popular ? styles.popularCard : ""
            }`}
          >
            {plan.popular && (
              <span className={styles.badge}>Most Popular</span>
            )}

            <div className={styles.top}>
              <h2 className={styles.planName}>{plan.name}</h2>

              <div className={styles.priceRow}>
                <span className={styles.symbol}>₹</span>
                <span className={styles.amount}>{plan.price}</span>
              </div>

              <p className={styles.creditText}>
                {plan.credits} Credits
              </p>
            </div>

            <p className={styles.description}>{plan.desc}</p>

            <ul className={styles.featureList}>
              {plan.features.map((feat, i) => (
                <li key={i}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: plan.color }}
                  ></span>
                  {feat}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePayment(plan.name)}
              disabled={paymentLoading || verifyLoading}
              className={`${styles.cta} ${
                plan.popular ? styles.ctaPrimary : styles.ctaSecondary
              }`}
            >
              {paymentLoading || verifyLoading
                ? "Processing..."
                : user
                ? "Upgrade Now"
                : "Login to Buy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;