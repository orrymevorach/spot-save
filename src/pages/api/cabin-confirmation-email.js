import { replaceCamelCaseWithSpaces } from '@/utils/string-utils';

let nodemailer = require('nodemailer');

export default async function handler(req, res) {
  const { groupMembers, cabin, selectedBeds } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  for (let i = 0; i < groupMembers.length; i++) {
    const groupMember = groupMembers[i];
    const selectedBed = selectedBeds.find(
      ({ name }) => name === groupMember.name
    );
    const selectedBedName = selectedBed
      ? replaceCamelCaseWithSpaces(selectedBed.bedName)
      : 'No bed selected';
    await transporter.sendMail({
      from: 'Highlands Music Festival noreply@reservations.highlandsmusicfestival.ca',
      to: groupMember.emailAddress,
      subject: 'Cabin Reservation Confirmed!',
      html: `
      <div>
        <img src="https://reservations.highlandsmusicfestival.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo-1200px-No-Bkgd-min.effb0614.png&w=3840&q=75" style="width:300px;" }} />
        <p>Your reservation is confirmed!</p>
        <p>Cabin: <span style="font-weight:bold;">${cabin.name}</span></p>
        <p>Unit: <span style="font-weight:bold;">${cabin.unit}</span></p>
        <p>Bed: <span style="font-weight:bold;text-transform:capitalize">${selectedBedName}</span></p>
        <p>If you did not make this reservation, someone may have made a booking on your behalf.</p>
        <p>To view or modify your reservation, <a href="https://reservations.highlandsmusicfestival.ca">click here</a>.</p>
        <p>If you have any question or concerns, please contact us at info@highlandsmusicfestival.ca</p>
        <p><em>Please do not reply to this email</em></p>
      </div>
      `,
    });
  }

  res.status(200).json({});
}
