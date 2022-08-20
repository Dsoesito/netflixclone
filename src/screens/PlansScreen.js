import { useEffect, useState } from "react";
import {
  collection,
  where,
  query,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";
import "./PlansScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [plans, setPlans] = useState([]);
  const [prices, setPrices] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [priceIds, setPriceIds] = useState([]);
  const user = useSelector(selectUser);
  const [role, setRole] = useState(null);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState(null);
  const [currentPeriodStart, setCurrentPeriodStart] = useState(null);
  const [isCurrentPackage, setIsCurrentPackage] = useState([]);

  useEffect(() => {
    // Retrieve plans and desriptions
    const plansSnapshot = async () => {
      const queryMain = await getDocs(
        query(collection(db, "products"), where("active", "==", true))
      );
      const plansList = [];
      const descriptionsList = [];
      for (let i = 0; i < queryMain.docs.length; i++) {
        const plan =
          queryMain.docs[i]._document.data.value.mapValue.fields.name
            .stringValue;
        plansList.push(plan);

        const description =
          queryMain.docs[i]._document.data.value.mapValue.fields.description
            .stringValue;
        descriptionsList.push(description);
      }
      setPlans(plansList);
      setDescriptions(descriptionsList);
    };
    plansSnapshot().catch(console.error);

    // Retrieve prices and price id
    const pricesSnap = async () => {
      const products = await getDocs(
        query(collection(db, "products"), where("active", "==", true))
      );
      const priceList = [];
      const priceIdList = [];
      for (let i = 0; i < products.docs.length; i++) {
        const prices = await getDocs(
          query(collection(db, `products/${products.docs[i].id}/prices`))
        );
        // console.log(prices);
        const priceCents =
          prices.docs[0]._document.data.value.mapValue.fields.unit_amount
            .integerValue;

        const priceDollar = priceCents / 100;
        priceList.push(priceDollar);

        const priceId = prices.docs[0]._document.key.path.segments[8];
        priceIdList.push(priceId);
      }
      setPrices(priceList);
      setPriceIds(priceIdList);
    };
    pricesSnap().catch(console.error);
  }, []);

  useEffect(() => {
    //Retrieve role, period end, period start
    const customerData = async () => {
      const userData = await getDocs(
        query(collection(db, `customers/${user.uid}/subscriptions`))
      );
      // console.log(userData);
      setRole(
        userData.docs[0]._document.data.value.mapValue.fields.role.stringValue
      );
      setCurrentPeriodEnd(
        userData.docs[0]._document.data.value.mapValue.fields.current_period_end
          .timestampValue
      );
      setCurrentPeriodStart(
        userData.docs[0]._document.data.value.mapValue.fields
          .current_period_start.timestampValue
      );
    };
    customerData().catch(console.error);
  }, [user.uid]);

  const loadCheckout = async (priceId) => {
    const main = async () => {
      const docRef = await addDoc(
        collection(db, `customers/${user.uid}/checkout_sessions`),
        {
          price: priceId,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        }
      );

      onSnapshot(docRef, (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          alert(`An error occured: ${error.message}`);
        }
        const load = async () => {
          if (sessionId) {
            const stripe = await loadStripe(
              "pk_test_51LXuiqJgmWNNenkUZn1U3GIvMZPdTPnuSYDNaIAyV4hm5cp2sD0gG4e1ETBAmpbKulp4oUlwwR3ABxKZdLdqWy1H00gI4HDUJj"
            );
            stripe.redirectToCheckout({ sessionId });
          }
        };
        load().catch(console.error);
      });
    };
    main().catch(console.error);
  };

  useEffect(() => {
    let statusList = [];
    for (let i = 0; i < plans.length; i++) {
      const isPackage = plans[i]?.toLowerCase().includes(role);
      statusList.push(isPackage);
    }
    setIsCurrentPackage(statusList);
  }, [role, plans]);

  const renderInfo = () => {
    let info = [];
    for (let i = 0; i < prices.length; i++) {
      info.push(
        <div key={i}>
          <div
            className={`${
              isCurrentPackage[i] && "planScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{plans[i]}</h5>
              <h6>{descriptions[i]}</h6>
            </div>
            <button
              onClick={() => !isCurrentPackage[i] && loadCheckout(priceIds[i])}
            >
              {isCurrentPackage[i] ? "Current Package" : "Subscribe"}
            </button>
          </div>
        </div>
      );
    }
    return info;
  };

  return (
    <div className="plansScreen">
      <br />
      {role && (
        <div className="plansScreen__date">
          <h4>
            Renewal date: {new Date(currentPeriodEnd).toLocaleDateString()}
          </h4>
          <br />
          <h4>
            First billing date:
            {new Date(currentPeriodStart).toLocaleDateString()}
          </h4>
        </div>
      )}
      {renderInfo()}
    </div>
  );
}

export default PlansScreen;
