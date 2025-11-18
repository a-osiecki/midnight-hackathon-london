# Midnight Hackathon: ZK KYC Health Data Marketplace from IoT wearables

Our Midnight Hackathon project submission repository for the Healthcare track.

- Team name: Gracias Esteban
- Team members:
  - Sara Kim
  - Valentino Cerutti
  - Agustín Osiecki
  - Ignacio Dopazo

- Slides link: https://docs.google.com/presentation/d/1MB2G2Mv03PFLQrgyiTgH-rxgu_WFBdMu69HzBgkdyNI/

## Setup & Run

TODO

## Project Overview

We built a privacy-preserving data marketplace where organizations (“data buyers”) can request specific health metrics, and users (“data providers”) can submit this information in a secure and anonymous way.

### Tools Used

- Onchain: Compact
- Offchain: Midnight JS libraries
- UI: Next.js
- Backend: Express.js
- Dev Tooling: pnpm package manager
- Integrations: Strava API

The Strava API integration was used to get and process heart rate-related data and statistics, as well as user information such as location, gender, weight, among others.

### Problem: Personal Health Data Access Barriers

In health research and clinical trials, obtaining personal health data from qualified participants is extremely difficult. Raw health data, such as biometrics from wearables, self-reported metrics, or any device-generated physiological signals whatsoever, is legally sensitive and tightly regulated[<sup>1</sup>](#references). Sharing this data directly exposes both participants and organizations to privacy risks, regulatory violations, and complex compliance workflows[<sup>1</sup>](#references)[<sup>,2</sup>](#references).

Researchers and companies often need data only from individuals who meet specific criteria (for example: age ranges, BMI thresholds, activity levels, or demographic filters). But verifying these eligibility requirements usually requires collecting personal information that users do not want to reveal[<sup>3</sup>](#references). This creates friction, delays, and a high barrier to participation.

As a result, valuable health metrics remain inaccessible, and many research projects—especially commercial or industry-driven ones—struggle to recruit participants, validate samples, or securely collect the data they need.

### Our Solution: A Private Health Data Marketplace

Data buyers deploy a “market” contract defining:

- the exact health metrics they need
- the eligibility rules participants must meet
- the reward amount for valid submissions
- their public key to decrypt final data

Users can join any market they qualify for. Instead of revealing personal details such as age, weight, or other attributes, users prove, by using KYC zero-knowledge proofs, that they meet the buyer’s requirements without exposing the underlying values.

Once verified, eligible users can submit the requested metrics from their devices or wearables. Submission automatically encrypts the data with the buyer’s public key and stores it on-chain. The system tracks rewards owed to each contributor, allowing them to claim payouts at any time.

This creates an incentive-aligned environment: buyers receive the health metrics they need, and users contribute securely without sacrificing privacy.

### References

<sup>1</sup> [PubMed Central: Data privacy in healthcare: Global challenges and solutions](https://pmc.ncbi.nlm.nih.gov/articles/PMC12138216/)

<sup>2</sup> [BMJ Journals: Patients’ and public views and attitudes towards the sharing of health data for research: a narrative review of the empirical evidence](https://jme.bmj.com/content/48/1/3)

<sup>3</sup> [BioMed Central: Decoding privacy concerns: the role of perceived risk and benefits in personal health data disclosure](https://archpublichealth.biomedcentral.com/articles/10.1186/s13690-024-01416-z)