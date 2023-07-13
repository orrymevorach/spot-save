export const sendConfirmationEmail = async ({
  groupMembers,
  cabin,
  selectedBeds,
}) => {
  const res = await fetch('/api/cabin-confirmation-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ groupMembers, cabin, selectedBeds }),
  }).then(res => res.json());
};
