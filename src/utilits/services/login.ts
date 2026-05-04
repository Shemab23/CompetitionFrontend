// import { links } from "../General"

export interface TermSection {
  id: number
  heading: string
  content: string
}
export interface TermsData {
  title: string
  version: string
  lastUpdated: string
  sections: TermSection[]
}
export const termsData: TermsData = {
  title: "NobelSource Smart Contract Terms",
  version: "2.4.0",
  lastUpdated: "April 2026",
  sections: [
    {
      id: 1,
      heading: "Logistics Integrity",
      content:
        "Users must provide accurate weight and origin data for all regional African commodities. Misrepresentation leads to immediate account suspension.",
    },
    {
      id: 2,
      heading: "Smart Contract Execution",
      content:
        "Bids and orders are finalized via automated smart contracts. Once an order enters the 'Chamber', the commitment is legally binding.",
    },
    {
      id: 3,
      heading: "Data Privacy",
      content:
        "Supply chain data is encrypted. However, anonymized transit times are used to improve the regional marketplace efficiency.",
    },
  ],
}
export interface TermsOverlayProps {
  isOpen: boolean
  onClose: () => void
}
export const backgroundUrl: string = 'https://images.pexels.com/photos/4484155/pexels-photo-4484155.jpeg';
type loginAction = {
  email: string;
  password: string;
}
export type responce = {
  id: string;
  email: string;
  legal_name: string;
  registration_number: string;
  role: string;
  metadata: {
    country: string;
    industry_tags: string[];
    verification_status: string;
    trust_score: number;
    credentials: {
      type: string;
      status: string;
      document_url: string;
    }[];
  };
}

// functions

export const LoginAction = async (data: loginAction): Promise<{ok:boolean,user:responce|null}> => {
  try {
    if(!data.email || !data.password){
      return {ok:false,user:null}
    }

    // const answer = await fetch(links.postLogin, {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data)
    // });

    // if (answer.status !== 200) {
    //   alert(answer.status)
    //   return Promise.resolve(false)
    // }
    const user: responce = {
      id: 'user1234',
      email: "joe@sunrise.com",
      legal_name: "Joseph Farmer",
      registration_number: "KE-AG-992",
      role: "user",
      metadata: {
        country: "Kenya",
        industry_tags: ["Agro_Exporter"],
        verification_status: "verified",
        trust_score: 75,
        credentials: [
          { type: "phytosanitary_cert", status: "approved", document_url: "https://s3.nobel/phyto1.pdf" }
        ]
      }
    }

    return {ok:true,user}
  } catch (error) {
    console.log(error);
    alert(error)
    return {ok:false,user:null}
  }
}
