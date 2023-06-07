import { useState } from 'react';
import InputVerify from './inputVerify/inputVerify';
import Button from '@/components/shared/button/button';
import { getUserByEmail, reserveSpotInCabin } from '@/lib/airtable';

export default function EmailVerificationTakeover({
  bedQuantity,
  selectedCabin,
}) {
  const quantityAsArray = Array.from(Array(bedQuantity));
  const [numberOfVerifiedEmails, setNumberOfVerifiedEmails] = useState(0);
  const [verifiedEmails, setVerifiedEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const reserveCabinForUser = async () => {
    setIsLoading(true);
    let response;
    for (let i = 0; i < verifiedEmails.length; i++) {
      const email = verifiedEmails[i];
      const userResponse = await getUserByEmail({ email });
      response = await reserveSpotInCabin({
        cabinId: selectedCabin.id,
        attendeeId: userResponse.id,
      });
    }
    if (response) setIsLoading(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {quantityAsArray.map((_, index) => {
        return (
          <InputVerify
            key={`email-input-${index}`}
            index={index}
            setNumberOfVerifiedEmails={setNumberOfVerifiedEmails}
            numberOfVerifiedEmails={numberOfVerifiedEmails}
            verifiedEmails={verifiedEmails}
            setVerifiedEmails={setVerifiedEmails}
          />
        );
      })}
      {numberOfVerifiedEmails}/{bedQuantity} emails verified
      {numberOfVerifiedEmails === bedQuantity && (
        <Button isLoading={isLoading} handleClick={reserveCabinForUser}>
          Submit
        </Button>
      )}
    </div>
  );
}
