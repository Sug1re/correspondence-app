"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const useFaqs = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faq"));
        const faqsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          question: doc.data().question,
          answer: doc.data().answer,
        }));
        setFaqs(faqsData);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return { faqs, isLoading, error };
};
