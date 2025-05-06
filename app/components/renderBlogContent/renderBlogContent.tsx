import { JSX } from "react";
export default function RenderBlogContent({ content }: { content: any[] }) {
  const elements = [];
  let currentList: any[] = [];
  let currentListFormat: string | null = null;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];

    if (block.type === "list") {
      if (currentListFormat === block.format || currentList.length === 0) {
        currentList.push(...block.children);
        currentListFormat = block.format;
      } else {
        // Cambió el formato, renderizar lista anterior y comenzar nueva
        const ListTag = currentListFormat === "unordered" ? "ul" : "ol";
        elements.push(
          <ListTag key={`list-${i}`}>
            {currentList.map((item, idx) => (
              <li key={idx}>
                {item.children.map((child: any, j: number) =>
                  child.bold ? (
                    <strong key={j}>{child.text}</strong>
                  ) : (
                    <span key={j}>{child.text}</span>
                  )
                )}
              </li>
            ))}
          </ListTag>
        );
        // Iniciar nueva lista
        currentList = [...block.children];
        currentListFormat = block.format;
      }
    } else {
      // Si venía una lista acumulada, renderizarla primero
      if (currentList.length > 0) {
        const ListTag = currentListFormat === "unordered" ? "ul" : "ol";
        elements.push(
          <ListTag key={`list-${i}`}>
            {currentList.map((item, idx) => (
              <li key={idx}>
                {item.children.map((child: any, j: number) =>
                  child.bold ? (
                    <strong key={j}>{child.text}</strong>
                  ) : (
                    <span key={j}>{child.text}</span>
                  )
                )}
              </li>
            ))}
          </ListTag>
        );
        currentList = [];
        currentListFormat = null;
      }

      switch (block.type) {
        case "paragraph":
          elements.push(
            <p key={i}>
              {block.children.map((child: any, j: number) =>
                child.bold ? <strong key={j}>{child.text}</strong> : child.text
              )}
            </p>
          );
          break;
        case "heading":
          const level = block.level || 2;
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          elements.push(
            <Tag key={i}>
              {block.children.map((child: any, j: number) => (
                <span
                  key={j}
                  style={{ fontWeight: child.bold ? "bold" : "normal" }}
                >
                  {child.text}
                </span>
              ))}
            </Tag>
          );
          break;
      }
    }
  }

  // Renderizar cualquier lista que haya quedado pendiente
  if (currentList.length > 0) {
    const ListTag = currentListFormat === "unordered" ? "ul" : "ol";
    elements.push(
      <ListTag key="final-list">
        {currentList.map((item, idx) => (
          <li key={idx}>
            {item.children.map((child: any, j: number) => (
              <span key={j}>{child.text}</span>
            ))}
          </li>
        ))}
      </ListTag>
    );
  }

  return elements;
}
