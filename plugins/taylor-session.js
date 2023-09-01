import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
let exec = promisify(_exec).bind(cp);

let handler = async (m, { conn, isOwner, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return;
  m.reply('Executing...');

  const compressedFilePath = 'TaylorSession.tar.gz';
  if (!fs.existsSync(compressedFilePath)) {
    try {
      await exec('tar -czf TaylorSession.tar.gz TaylorSession');
      m.reply('Successfully created TaylorSession.tar.gz!');
    } catch (e) {
      m.reply('Failed to create TaylorSession.tar.gz');
      return; // Stop execution if tar command failed
    }
  } else {
    m.reply('TaylorSession.tar.gz already exists, skipping creation...');
  }

  // Check again if the file exists after compression attempt
  if (fs.existsSync(compressedFilePath)) {
    const compressedData = fs.readFileSync(compressedFilePath);
    await conn.sendMessage(
      m.chat,
      {
        document: compressedData,
        mimetype: 'application/gz',
        fileName: 'TaylorSession.tar.gz',
      },
      {
        quoted: m,
      }
    );
  } else {
    m.reply('File not found. Compression may have failed.');
  }
};

handler.help = ['taylorsession'];
handler.tags = ['owner'];
handler.command = /^(taylorsession)$/i;
handler.rowner = true;

export default handler;
