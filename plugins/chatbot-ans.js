export async function before(m, { match }) {
    if (!m.chat.endsWith('@s.whatsapp.net')) return false;
    this.chatbot = this.chatbot || {};
    let room = Object.values(this.chatbot).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING');
    
    if (room && /^.*(chatbot (stop|set))/.test(m.text)) {
        return false;
    }
    
    if (room) {
        let other = [room.a, room.b].find(user => user !== m.sender);

        if (m.message.listMessage) {
            const description = m.message.listMessage.description;
            const sections = m.message.listMessage.sections;
            const more = String.fromCharCode(8206)
            const readMore = more.repeat(4001)
            let sectionText = `${description}\n\n`;
            sections.forEach(section => {
                sectionText += `${readMore}\n`;
                section.rows.forEach(row => {
                    sectionText += `${row.title}\n${row.description}\n*Send*: ${row.rowId}\n\n`;
                });
            });

            await this.sendMessage(other, { text: sectionText }, { quoted: null });
        } else {
            await this.relayMessage(other, m.message, { messageId: m.id });
        }
    }
    
    return true;
}
