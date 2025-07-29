import React from 'react';

const Chat: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Chat</h1>
      <div className="flex flex-col md:flex-row mt-4">
        <div className="w-full md:w-1/3 border-r">
          {/* Inbox List */}
          <ul>
            <li className="p-4 border-b hover:bg-muted cursor-pointer">
              <p className="font-bold">Dr. Amanda Foster</p>
              <p className="text-sm text-muted-foreground">Hey, how are you?</p>
            </li>
            <li className="p-4 border-b hover:bg-muted cursor-pointer">
              <p className="font-bold">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Can you check on patient X?</p>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-2/3 p-4">
          {/* Chat Window */}
          <div className="h-96 border rounded-md p-4">
            {/* Messages */}
            <div className="flex flex-col space-y-4">
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <p>Hey, how are you?</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <p>I'm good, thanks! How about you?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border border-border rounded-md p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
