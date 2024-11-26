import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';

const StreamingText: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null); // Reference for the container
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined = undefined;
  let _buffer = ''; // Buffer to store incomplete chunks

  const startStreaming = async () => {
    if (isStreaming) return;
    setIsStreaming(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/clients/ducnsh/chatbot/75e18cf50630fa6aa2704adb9a208466b68adb60b571add3d3aece43570a9112/chat/simple_chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': `${import.meta.env.VITE_X_API_KEY}`,
        },
        body: JSON.stringify({
          question: 'what is smart wallet',
          use_followup_question: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      reader = response.body?.getReader();
      if (!reader) {
        console.error('No reader available.');
        return;
      }

      const decoder = new TextDecoder();
      setData([]); // Clear previous data

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // console.log('Streaming completed.');
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        _buffer += chunk;

        // Split buffer into complete lines
        const lines = _buffer.split(/\n+/);
        _buffer = lines.pop() ?? '';

        setData((prev) => [...prev, ...lines]);
      }
    } catch (error) {
      console.error('Streaming error:', error);
    } finally {
      if (reader) {
        reader.releaseLock();
      }
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight; // Auto-scroll
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (reader) {
        reader.cancel().catch(() => {});
      }
    };
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h1>Streaming Text Example</h1>
      <button onClick={startStreaming} disabled={isStreaming}>
        {isStreaming ? 'Streaming...' : 'Start Streaming'}
      </button>
      <div id="data-container" ref={containerRef} style={{ whiteSpace: 'pre-wrap', marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}>
        {data.map((chunk, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <Markdown>{chunk}</Markdown>
          </div>
        ))}
        <div>
          <Markdown>{_buffer}</Markdown>
        </div>{' '}
        {/* Render any remaining incomplete chunk */}
      </div>
    </div>
  );
};

export default StreamingText;
